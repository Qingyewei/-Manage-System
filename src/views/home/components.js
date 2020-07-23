
import users from '@/views/user/components'
import mineManage from '../mine/components';
import rights from '../rights/components'
import goods from '../commodityManagement/components'
import orders from '../orderManagement/components'
import reports from '../dataStatistics/components'
import StudyJavaScriptVue from '../studyJavaScriptVue/components'


let components = { };

components = Object.assign(
    components,
    users,
    mineManage,
    rights,
    goods,
    orders,
    reports,
    StudyJavaScriptVue
);

export default components;