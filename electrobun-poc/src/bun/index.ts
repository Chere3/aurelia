import { BrowserWindow, Updater, Utils } from "electrobun/bun";
import { prisma } from "./db";
import { google } from "googleapis";
import fs from "node:fs";
import path from "node:path";

const DEV_SERVER_PORT = 5173;
const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}`;
const API_PORT = 4187;

const TOKEN_PATH = path.join(process.env.HOME || "", ".clawd", "google-calendar-token.json");

async function getMainViewUrl(): Promise<string> {
	const channel = await Updater.localInfo.channel();
	if (channel === "dev") {
		try {
			await fetch(DEV_SERVER_URL, { method: "HEAD" });
			console.log(`HMR enabled: Using Vite dev server at ${DEV_SERVER_URL}`);
			return DEV_SERVER_URL;
		} catch {
			console.log(
				"Vite dev server not running. Run 'bun run dev:hmr' for HMR support.",
			);
		}
	}
	return "views://mainview/index.html";
}

function dateKey(d: Date) {
	return d.toISOString().slice(0, 10);
}

function requiresComputerFromSummary(summary: string) {
	const s = summary.toLowerCase();
	const noPcHints = ["walk", "caminar", "gym", "gimnasio", "run", "correr", "comida", "almuerzo", "llamada", "call", "offline", "descanso"];
	if (noPcHints.some((k) => s.includes(k))) return false;
	return true;
}

async function getCalendarTasksToday() {
	if (!fs.existsSync(TOKEN_PATH)) return [];
	try {
		const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
		const oauth2Client = new google.auth.OAuth2();
		oauth2Client.setCredentials(token);
		const calendar = google.calendar({ version: "v3", auth: oauth2Client });

		const start = new Date();
		start.setHours(0, 0, 0, 0);
		const end = new Date(start);
		end.setDate(end.getDate() + 1);

		const response = await calendar.events.list({
			calendarId: "primary",
			timeMin: start.toISOString(),
			timeMax: end.toISOString(),
			singleEvents: true,
			orderBy: "startTime",
			maxResults: 30,
		});

		const items = response.data.items || [];
		return items
			.filter((e) => Boolean(e.summary) && Boolean(e.start?.dateTime))
			.map((e) => ({
				id: e.id || crypto.randomUUID(),
				title: e.summary || "Evento",
				requiresComputer: requiresComputerFromSummary(e.summary || ""),
				start: e.start?.dateTime,
			}));
	} catch (err) {
		console.error("Calendar task fetch error:", err);
		return [];
	}
}

Bun.serve({
	port: API_PORT,
	async fetch(req) {
		const url = new URL(req.url);

		if (req.method === "GET" && url.pathname === "/api/tasks/today") {
			const tasks = await getCalendarTasksToday();
			return Response.json(tasks);
		}

		if (req.method === "POST" && url.pathname === "/api/focus-sessions") {
			const payload = await req.json();
			const session = await prisma.focusSession.create({
				data: {
					phase: payload.phase,
					taskTitle: payload.taskTitle,
					requiresComputer: Boolean(payload.requiresComputer),
					lockMode: payload.lockMode,
					plannedSeconds: Number(payload.plannedSeconds ?? 0),
					elapsedSeconds: Number(payload.elapsedSeconds ?? 0),
					completed: Boolean(payload.completed),
					startedAt: payload.startedAt ? new Date(payload.startedAt) : new Date(),
					endedAt: payload.endedAt ? new Date(payload.endedAt) : null,
				},
			});
			return Response.json({ ok: true, id: session.id });
		}

		if (req.method === "GET" && url.pathname === "/api/kpis/today") {
			const start = new Date();
			start.setHours(0, 0, 0, 0);

			const sessions = await prisma.focusSession.findMany({
				where: {
					createdAt: { gte: start },
					phase: "focus",
					completed: true,
				},
				orderBy: { createdAt: "desc" },
			});

			const focusSeconds = sessions.reduce((acc, s) => acc + s.elapsedSeconds, 0);
			return Response.json({
				focusMinutesToday: Math.floor(focusSeconds / 60),
				completedPomodoros: sessions.length,
			});
		}

		if (req.method === "GET" && url.pathname === "/api/focus-sessions/recent") {
			const sessions = await prisma.focusSession.findMany({
				where: { phase: "focus", completed: true },
				orderBy: { createdAt: "desc" },
				take: 8,
			});
			return Response.json(sessions);
		}

		if (req.method === "GET" && url.pathname === "/api/kpis/streak") {
			const sessions = await prisma.focusSession.findMany({
				where: { phase: "focus", completed: true },
				orderBy: { createdAt: "desc" },
				take: 120,
			});
			const days = Array.from(new Set(sessions.map((s) => dateKey(new Date(s.createdAt)))));
			let streak = 0;
			let cursor = new Date();
			cursor.setHours(0, 0, 0, 0);

			for (let i = 0; i < 120; i++) {
				const key = dateKey(cursor);
				if (days.includes(key)) {
					streak++;
					cursor.setDate(cursor.getDate() - 1);
					continue;
				}
				if (i === 0) {
					cursor.setDate(cursor.getDate() - 1);
					const yesterday = dateKey(cursor);
					if (days.includes(yesterday)) {
						streak++;
						cursor.setDate(cursor.getDate() - 1);
						continue;
					}
				}
				break;
			}

			return Response.json({ streakDays: streak });
		}

		return new Response("Not found", { status: 404 });
	},
});

const url = await getMainViewUrl();

const mainWindow = new BrowserWindow({
	title: "Aurelia",
	url,
	frame: {
		width: 1100,
		height: 760,
		x: 180,
		y: 140,
	},
});

mainWindow.on("close", async () => {
	await prisma.$disconnect();
	Utils.quit();
});

console.log("Aurelia app started!");
