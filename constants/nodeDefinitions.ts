
type BaseNode = {
    title: string;
    route: string;
};

type TextNode = BaseNode & {
    kind: 'text';
    getContent: () => string;
};

type RecordingsNode = BaseNode & {
    kind: 'recordings';
    getItems: () => { id: number; title: string }[];
};

type BlogNode = BaseNode & {
    kind: 'blogIndex';
};

type DevNode = BaseNode & {
    kind: 'projects';
};

export type NodeDefinition =
    | TextNode
    | RecordingsNode
    | BlogNode
    | DevNode;
