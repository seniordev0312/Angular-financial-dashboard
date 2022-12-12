import { SectionDetails } from "./section-details.model";

export interface EntityDetails {
    id: string;
    name: string;
    code: string;
    sections: SectionDetails[];
}