import { writable, type Writable } from "svelte/store";

import type { Toast } from "$lib/websiteInterfaces"

export const toasts: Writable<Toast[]> = writable([]);

export const addToast = (toast: Toast) => {
    // Create a unique ID so we can easily find/remove it
    // if it is dismissible/has a timeout.
    const id = Math.floor(Math.random() * 10000);

    // Setup some sensible defaults for a toast.
    const defaults: Toast = {
        id,
        type: "info",
        timeoutTime: 3000,
        message: ""
    };

    // Push the toast to the top of the list of toasts
    toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

    // If toast is dismissible, dismiss it after "timeout" amount of time.
    if (toast.timeoutTime) setTimeout(() => dismissToast(id), toast.timeoutTime);
};

export const dismissToast = (id: number) => {
    toasts.update((all) => all.filter((t) => t.id !== id));
};

// export const Writable<