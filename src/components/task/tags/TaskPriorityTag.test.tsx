import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TaskPriorityTag from "./TaskPriorityTag";

describe("TaskPriorityTag", () => {
  it("hiển thị chữ mức độ ưu tiên in hoa", () => {
    render(<TaskPriorityTag priority="high" />);
    expect(screen.getByText("HIGH")).toBeInTheDocument();
  });

  it("hiển thị mức độ ưu tiên trung bình in hoa", () => {
    render(<TaskPriorityTag priority="medium" />);
    expect(screen.getByText("MEDIUM")).toBeInTheDocument();
  });

  it("hiển thị mức độ ưu tiên thấp in hoa", () => {
    render(<TaskPriorityTag priority="low" />);
    expect(screen.getByText("LOW")).toBeInTheDocument();
  });

  it("áp dụng màu lỗi cho mức độ ưu tiên cao", () => {
    const { container } = render(<TaskPriorityTag priority="high" />);
    // Ant Design render color="error" thành class ant-tag-error
    expect(container.querySelector(".ant-tag-error")).toBeInTheDocument();
  });

  it("áp dụng màu cảnh báo cho mức độ ưu tiên trung bình", () => {
    const { container } = render(<TaskPriorityTag priority="medium" />);
    expect(container.querySelector(".ant-tag-warning")).toBeInTheDocument();
  });

  it("áp dụng màu thành công cho mức độ ưu tiên thấp", () => {
    const { container } = render(<TaskPriorityTag priority="low" />);
    expect(container.querySelector(".ant-tag-success")).toBeInTheDocument();
  });
});
