import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { JobType } from './JobType'



function JobModel(data: PartialDeep<JobType>): JobType {
    data = data || {};
    return _.defaults(data, {
        id: 0,
        company_id: [],
        title: '',
        description: '',
        qualifications: '',
        salary: 0,
        location: '',
        recruiter: 0,
        sector: { "id": 0, "name": "" },
        expiry_date: Date(),
        skills: [{ "id": 0, "name": "" }],
        status: 'OPEN',
        created_date: Date(),
        updated_date: Date(),
    });
}

export default JobModel;
