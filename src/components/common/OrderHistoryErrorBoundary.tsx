import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class OrderHistoryErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Order history rendering error captured:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="border border-rose-200 bg-rose-50/50 p-6 text-center rounded-none animate-fade-in">
          <p className="text-xs text-rose-700 font-sans font-medium uppercase tracking-wider mb-2">
            Order History Loading Issue
          </p>
          <p className="text-[11px] text-primary-muted font-sans leading-relaxed max-w-md mx-auto">
            We encountered an unexpected error displaying some of your orders. Please refresh the page or contact support if the issue persists.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
