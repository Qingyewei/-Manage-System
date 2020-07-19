
import users from '@/views/user/components'
import mineManage from '../mine/components';
import rights from '../rights/components'
import goods from '../commodityManagement/components'


let components = { };

components = Object.assign(
    components,
    users,
    mineManage,
    rights,
    goods
);

export default components;