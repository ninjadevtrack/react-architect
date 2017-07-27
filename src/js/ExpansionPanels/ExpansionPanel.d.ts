import * as React from 'react';
import { Props } from '../index';
import { ButtonTypes } from '../Buttons';

export interface ExpansionPanelProps extends Props {
  headerStyle?: React.CSSProperties;
  headerClassName?: string;
  contentStyle?: React.CSSProperties;
  contentClassName: string;
  label: React.ReactNode;
  secondaryLabel?: React.ReactNode;
  expandedSecondaryLabel?: React.ReactNode;
  component?: React.ReactType;
  expanded?: boolean;
  defaultExpanded?: boolean;
  expandIconChildren?: React.ReactNode;
  expandIconClassName?: string;
  focused?: boolean;
  columnWidths?: Array<number>;
  onExpandToggle?: (expanded: boolean) => void;
  onSave?: (event: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (event: React.MouseEvent<HTMLElement>) => void;
  closeOnSave?: boolean;
  closeOnCancel?: boolean;
  saveType?: ButtonTypes;
  saveLabel?: React.ReactNode;
  savePrimary?: boolean;
  saveSecondary?: boolean;
  saveProps?: Object;
  cancelType?: ButtonTypes;
  cancelLabel?: React.ReactNode;
  cancelPrimary?: boolean;
  cancelSecondary?: boolean;
  canelProps?: Object;
  tabIndex?: number;
  children?: React.ReactNode;
  animateContent?: boolean;
  footer?: React.ReactNode;
}

declare const ExpansionPanel: React.ComponentClass<ExpansionPanelProps>;
export default ExpansionPanel;
