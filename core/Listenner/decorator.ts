import { NFTaskListener } from "../nftasklistener";
import { eventListenType } from "../types";

/**
 * 任务监听器装饰器
 * @param eventType
 * @returns 
 */
export function listener(eventType: string) {
    return function (target: Function) {
        switch (eventType) {
            case eventListenType.START: NFTaskListener.setStartListMap(target.name, target); break;
            case eventListenType.END: NFTaskListener.setEndListenerMap(target.name, target); break;
            case eventListenType.TAKE: NFTaskListener.setTakeListenerMap(target.name, target); break;
        }
    };
}