
import users from '@/views/user/components'
import mineManage from '../mine/components';
import rights from '../rights/components'
import goods from '../commodityManagement/components'
import orders from '../orderManagement/components'
import reports from '../dataStatistics/components'
import StudyJavaScriptVue from '../studyJavaScriptVue/components'
import formRelated from '../formRelated/components'
import dragAndDrop from '../dragAndDrop/components'
import internationalization from '../internationalization/components'
import errorHandling from '../errorHandling/components'



let components = { };

components = Object.assign(
    components,
    users,
    mineManage,
    rights,
    goods,
    orders,
    reports,
    StudyJavaScriptVue,
    formRelated,
    dragAndDrop,
    internationalization,
    errorHandling
);

export default components;