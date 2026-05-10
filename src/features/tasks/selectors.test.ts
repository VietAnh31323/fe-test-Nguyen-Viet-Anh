import { describe, it, expect } from "vitest";
import { selectFilteredTasks, selectTaskStats } from "./selectors";
import type { RootState } from "../../store/store";
import type { Task } from "../../types/types";

const TASKS: Task[] = [
  {
    id: "1",
    title: "Fix login bug",
    status: "todo",
    priority: "high",
    createdAt: "2024-01-01",
    dueDate: "2024-06-01",
  },
  {
    id: "2",
    title: "Write unit tests",
    status: "in_progress",
    priority: "medium",
    createdAt: "2024-01-02",
  },
  {
    id: "3",
    title: "Deploy to production",
    status: "done",
    priority: "low",
    createdAt: "2024-01-03",
    dueDate: "2024-07-01",
  },
];

const makeState = (overrides: Partial<RootState["tasks"]> = {}): RootState => ({
  tasks: {
    items: TASKS,
    filters: {
      searchText: "",
      status: [],
      priority: undefined,
      dateRange: undefined,
    },
    pagination: { currentPage: 1, pageSize: 10 },
    ...overrides,
  },
  theme: { isDarkMode: false },
});

// ─── selectFilteredTasks ─────────────────────────────────────────────────────

describe("selectFilteredTasks", () => {
  it("trả về tất cả công việc khi không có bộ lọc nào được đặt", () => {
    const result = selectFilteredTasks(makeState());
    expect(result).toHaveLength(3);
  });

  it("lọc theo searchText (không phân biệt hoa thường)", () => {
    const state = makeState({
      filters: {
        searchText: "login",
        status: [],
        priority: undefined,
        dateRange: undefined,
      },
    });
    const result = selectFilteredTasks(state);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("trả về mảng rỗng khi searchText không khớp với bất kỳ công việc nào", () => {
    const state = makeState({
      filters: {
        searchText: "xyz_no_match",
        status: [],
        priority: undefined,
        dateRange: undefined,
      },
    });
    expect(selectFilteredTasks(state)).toHaveLength(0);
  });

  it("lọc theo trạng thái", () => {
    const state = makeState({
      filters: {
        searchText: "",
        status: ["todo"],
        priority: undefined,
        dateRange: undefined,
      },
    });
    const result = selectFilteredTasks(state);
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe("todo");
  });

  it("lọc theo nhiều trạng thái", () => {
    const state = makeState({
      filters: {
        searchText: "",
        status: ["todo", "done"],
        priority: undefined,
        dateRange: undefined,
      },
    });
    const result = selectFilteredTasks(state);
    expect(result).toHaveLength(2);
  });

  it("lọc theo mức độ ưu tiên", () => {
    const state = makeState({
      filters: {
        searchText: "",
        status: [],
        priority: "medium",
        dateRange: undefined,
      },
    });
    const result = selectFilteredTasks(state);
    expect(result).toHaveLength(1);
    expect(result[0].priority).toBe("medium");
  });

  it("lọc theo khoảng ngày — công việc không có dueDate luôn được giữ lại", () => {
    const state = makeState({
      filters: {
        searchText: "",
        status: [],
        priority: undefined,
        dateRange: ["2024-05-01", "2024-06-30"],
      },
    });
    // công việc 1: dueDate "2024-06-01" → trong khoảng ✓
    // công việc 2: không có dueDate → luôn qua ✓
    // công việc 3: dueDate "2024-07-01" → ngoài khoảng ✗
    const result = selectFilteredTasks(state);
    expect(result).toHaveLength(2);
    expect(result.find((t) => t.id === "3")).toBeUndefined();
  });
});

// ─── selectTaskStats ──────────────────────────────────────────────────────────

describe("selectTaskStats", () => {
  it("trả về số lượng đúng cho từng trạng thái", () => {
    const stats = selectTaskStats(makeState());
    expect(stats.total).toBe(3);
    expect(stats.todo).toBe(1);
    expect(stats.inProgress).toBe(1);
    expect(stats.done).toBe(1);
  });

  it("trả về toàn bộ số 0 khi danh sách công việc rỗng", () => {
    const stats = selectTaskStats(makeState({ items: [] }));
    expect(stats.total).toBe(0);
    expect(stats.todo).toBe(0);
    expect(stats.inProgress).toBe(0);
    expect(stats.done).toBe(0);
  });
});
