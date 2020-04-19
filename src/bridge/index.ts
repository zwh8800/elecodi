interface Bridge {
    hello(): string;
    shellOpenItem(fullPath: string): boolean;
}

type BridgeWindow = Window & { bridge: Bridge };
const bridge: Bridge = (window as unknown as BridgeWindow).bridge;

export default bridge;
