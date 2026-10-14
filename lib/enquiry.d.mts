export type EnquiryFields = Record<string, unknown>;
export const contactEmail: string;
export function buildProjectBrief(fields: EnquiryFields): string;
export function buildProjectMailto(fields: EnquiryFields): string;
