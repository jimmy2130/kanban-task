import type * as CSS from 'csstype';

declare module 'csstype' {
	interface Properties {
		// Allow any CSS Custom Properties when using inline style
		[index: `--${string}`]: any;
	}
}
