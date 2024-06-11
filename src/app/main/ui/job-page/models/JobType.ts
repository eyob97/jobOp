export type JobType = {
    id: number;
    company_id: string[];
    title: string | null;
    description: string | null;
    qualifications: string | null;
    salary: number;
    location: string | null;
    recruiter: number;
    sector: { "id": number, "name": string }
    expiry_date: Date;
    skills: [{ "id": number, "name": string }];
    status: string | null;
    created_date: Date;
    updated_date: Date;
};