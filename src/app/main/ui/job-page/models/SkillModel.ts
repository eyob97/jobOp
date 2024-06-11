import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { JobType } from './JobType'
import { SkillType } from './SkillType';



function SkillModel(data: PartialDeep<SkillType>): SkillType {
    data = data || {};
    return _.defaults(data, {
        id: 0,
        name: ""
    });
}

export default SkillModel;
