// types/react-katex.d.ts
declare module 'react-katex' {
  import { Component } from 'react';

  export interface MathProps {
    math: string;
    block?: boolean;
    errorColor?: string;
    renderError?: (error: Error) => React.ReactNode;
    settings?: any;
  }

  export class InlineMath extends Component<MathProps> {}
  export class BlockMath extends Component<MathProps> {}
}
