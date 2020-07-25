
import users from '@/views/user/components'
import mineManage from '../mine/components';
import rights from '../rights/components'
import goods from '../commodityManagement/components'
import orders from '../orderManagement/components'
import reports from '../dataStatistics/components'
import StudyJavaScriptVue from '../studyJavaScriptVue/components'
import dashboard from '../dashboard/components'
import basicForm  from '../basedTable/components'
import tabs  from '../tabs/components'
import formRelated from '../formRelated/components'
import customIcon from '../customIcon/components'
import schartCharts from '../schartCharts/components'
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
    dashboard,
    basicForm,
    tabs,
    formRelated,
    customIcon,
    schartCharts,
    dragAndDrop,
    internationalization,
    errorHandling
);

export default components;