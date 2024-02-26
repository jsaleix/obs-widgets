"server only";
import { Widget } from "@/interfaces/widget";

const MOCK_WIDGET: Widget = {
    id: "WIDGET_1",
    owner: "noOne",
    secret: "1234",
    general: {
        bgColor: "#123456",
        iconsColor: "#000000",
        optionalText: null,
        optionalTextColor: null,
    },
    rows: [],
};

class WidgetService {
    async findOne(id: string): Promise<Widget | null> {
        if (id == MOCK_WIDGET.id) return MOCK_WIDGET;
        else return null;
    }
}

export default new WidgetService();
