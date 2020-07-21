
import users from '@/views/user/components'
import mineManage from '../mine/components';
import rights from '../rights/components'
import goods from '../commodityManagement/components'
import orders from '../orderManagement/components'


let components = { };

components = Object.assign(
    components,
    users,
    mineManage,
    rights,
    goods,
    orders
);

export default components;