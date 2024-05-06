// 項目的內容
export type TodoItem = {
    id: number;
    text: string;
    isCompleted: boolean;
};

// 假的Todo list資料，作為畫面呈現的測試使用。
export const SAMPLE_DATA: TodoItem[] | [] = [
    {
        id: 1,
        text: "讀書",
        isCompleted: true,
    },
    {
        id: 2,
        text: "運動",
        isCompleted: false,
    },
];