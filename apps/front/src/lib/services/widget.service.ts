"server only";
import {
    Widget,
    WidgetGeneralSettings,
    WidgetRowSettings,
} from "@/lib/interfaces/widget";
import { addOne, findAll, findMany, findOne } from "../firebase";
import { Collections } from "@/lib/config/firestore";

const MOCK_WIDGET: Widget = {
    name: "My widget",
    id: "WIDGET_1",
    owner: "noOne",
    secret: "1234",
    general: {
        bgColor: "#123456",
        iconsColor: "#000000",
        optionalText: "",
        optionalTextColor: "",
    },
    rows: [],
};

const DefaultGeneralSettings: WidgetGeneralSettings = {
    bgColor: "#000000",
    iconsColor: "#FFFFFF",
    optionalText: "",
    optionalTextColor: "",
};

const DefaultRow: WidgetRowSettings = {
    id: crypto.randomUUID(),
    icon: "icon",
    fontColor: "#000000",
    label: "",
    value: 0,
};

class WidgetService {
    async findOne(id: string): Promise<Widget | null> {
        try {
            return (await findOne(Collections.widgets, id)) as Widget;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async findAll() {
        return await findAll(Collections.widgets);
    }

    async findAllByOwner(owner: string) {
        return (await findMany(Collections.widgets, {
            field: "owner",
            op: "==",
            value: owner,
        })) as Widget[];
    }

    async create(name: string, owner: string) {
        const id = crypto.randomUUID();
        const data = {
            name: name,
            owner: owner,
            secret: crypto.randomUUID(),
            rows: [DefaultRow],
            general: DefaultGeneralSettings,
        };
        const res = await addOne(Collections.widgets, id, data);
        return res;
    }

    async isAllowedToEdit(widgetId: string, user: string) {
        const widget = await this.findOne(widgetId);
        return widget?.owner === user;
    }
}

export default new WidgetService();
