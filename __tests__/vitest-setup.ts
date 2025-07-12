import '@testing-library/jest-dom/vitest'
import { expect } from "vitest"
import * as matchers from "@testing-library/jest-dom/matchers"

expect.extend(matchers)

// Mock IntersectionObserver
globalThis.IntersectionObserver =
    globalThis.IntersectionObserver ||
    class {
        constructor() { }
        observe() { }
        disconnect() { }
        unobserve() { }
    };