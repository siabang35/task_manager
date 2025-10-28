import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"
import { jwt } from "@elysiajs/jwt"
import { swagger } from "@elysiajs/swagger"
import { t } from "elysia"

// 🏗️ Inisialisasi server
const app = new Elysia()
  .use(cors())
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET || "your-secret-key",
    })
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: "🧩 Task Manager Pro API",
          version: "1.0.0",
          description:
            "API backend untuk Task Manager Pro — dibangun menggunakan **Elysia**, **Bun**, dan **Supabase**.\n\n" +
            "Swagger UI ini berfungsi untuk dokumentasi interaktif dan testing endpoint API.",
        },
        servers: [
          {
            url: "http://localhost:4000",
            description: "Local development server",
          },
        ],
      },
      path: "/docs", // endpoint Swagger UI
    })
  )

// ✅ Health check endpoint
app.get(
  "/api/health",
  () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
  }),
  {
    detail: {
      summary: "Health Check",
      tags: ["System"],
      description: "Cek status server apakah berjalan dengan baik.",
      responses: {
        200: {
          description: "Server berjalan normal",
          content: {
            "application/json": {
              example: {
                status: "ok",
                timestamp: "2025-10-28T12:34:56.000Z",
              },
            },
          },
        },
      },
    },
  }
)

// 📋 Schema umum
const TaskSchema = t.Object({
  id: t.Optional(t.String()),
  userId: t.String(),
  title: t.String(),
  description: t.Optional(t.String()),
  status: t.Optional(t.String({ default: "pending" })),
  created_at: t.Optional(t.String({ format: "date-time" })),
})

// 🧠 TASK endpoints
app.post(
  "/api/tasks",
  async ({ body }) => {
    try {
      return { success: true, data: body }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  },
  {
    body: TaskSchema,
    detail: {
      summary: "Buat Task Baru",
      tags: ["Tasks"],
      description: "Endpoint untuk membuat task baru.",
      responses: {
        200: {
          description: "Task berhasil dibuat",
          content: { "application/json": { example: { success: true } } },
        },
      },
    },
  }
)

app.get(
  "/api/tasks/:userId",
  async ({ params }) => ({
    success: true,
    data: [{ id: "1", title: "Belajar Elysia", userId: params.userId }],
  }),
  {
    params: t.Object({ userId: t.String() }),
    detail: {
      summary: "Ambil Semua Task",
      tags: ["Tasks"],
      description: "Mengambil semua task berdasarkan user ID.",
    },
  }
)

// 📊 REPORT endpoints
app.post(
  "/api/reports",
  async ({ body }) => ({ success: true, data: body }),
  {
    body: t.Object({
      userId: t.String(),
      reportDate: t.String(),
      content: t.String(),
    }),
    detail: {
      summary: "Buat Report Harian",
      tags: ["Reports"],
    },
  }
)

app.get(
  "/api/reports/:userId",
  async ({ params }) => ({
    success: true,
    data: [{ id: "r1", userId: params.userId, content: "Report sample" }],
  }),
  {
    params: t.Object({ userId: t.String() }),
    detail: {
      summary: "Ambil Semua Report",
      tags: ["Reports"],
    },
  }
)

// 🕒 ATTENDANCE endpoints
app.post(
  "/api/attendance",
  async ({ body }) => ({ success: true, data: body }),
  {
    body: t.Object({
      userId: t.String(),
      date: t.String({ format: "date" }),
      status: t.String(),
    }),
    detail: {
      summary: "Catat Kehadiran",
      tags: ["Attendance"],
    },
  }
)

app.get(
  "/api/attendance/:userId",
  async ({ params }) => ({
    success: true,
    data: [{ userId: params.userId, date: "2025-10-28", status: "present" }],
  }),
  {
    params: t.Object({ userId: t.String() }),
    detail: {
      summary: "Ambil Data Kehadiran",
      tags: ["Attendance"],
    },
  }
)

// ✅ TODO endpoints
app.post(
  "/api/todos",
  async ({ body }) => ({ success: true, data: body }),
  {
    body: t.Object({
      userId: t.String(),
      task: t.String(),
      done: t.Boolean(),
    }),
    detail: {
      summary: "Tambah Todo",
      tags: ["Todos"],
    },
  }
)

app.get(
  "/api/todos/:userId",
  async ({ params }) => ({
    success: true,
    data: [
      { id: "t1", task: "Setup Supabase", done: false, userId: params.userId },
    ],
  }),
  {
    params: t.Object({ userId: t.String() }),
    detail: {
      summary: "Ambil Todo List",
      tags: ["Todos"],
    },
  }
)

// Jalankan server
app.listen(4000)
console.log("Server Elysia berjalan di http://localhost:4000")
console.log("Swagger UI tersedia di http://localhost:4000/docs")

export default app
