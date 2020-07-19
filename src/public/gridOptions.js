import localeText from "./agGridText";
import { debounce } from "lodash"

const defaultOptions = {
    singleSelection:false, // 是否单选
    operation:false, // 高级功能
    dragSelectCheckbox: true, // checkbox 拖选
    localeEn: false, // 是否显示英文
};

function gridOptions({
    singleSelection,
    operation,
    dragSelectCheckbox,
    localeEn
} = defaultOptions){
    // 自定义配置项
    let options = {
        enableRangeSelection: true, //允许拖动选择单元格
        suppressRowClickSelection: true, //单击选定单元格，false默认选定整行
        suppressRowTransform:true,// 配置行跨度
        // enableColResize: true, //支持列拖动
        // localeText: localeText, //表格字体汉化
		// enableFilter: true, //列过滤器
        // enableSorting: true, //列排序
        animateRows: true, //排序动画
        /**start */
        suppressDragLeaveHidesColumns:true,//是否允许列移动出表格外
        suppressMakeColumnVisibleAfterUnGroup:true,//分组后列显示
        /**end */
        rowSelection:'multiple'//多选
    };

    /** 是否单选 */
    if(singleSelection){
        options.rowSelection = 'single';
    }

    /** 高级功能
     *  （包含列分组和统计）
     */
    if(operation){
        Object.assign(
            options,
            {
                // enableStatusBar:true,
                // defaultColDef:{
                //     menuTabs:['generalMenuTab','filterMenuTab']
                // },
                // columnTypes:{
                //     'dateColumn':{filter:'agDateColumnFilter'},
                //     'textColumn':{filter:'agTextColumnFilter'},
                //     'numberColumn':{filter:'agNumberColumnFilter'}
                // }
            }
        )
    }
    /** checkbox 拖选(在单选时不生效) */ 
    if(dragSelectCheckbox && !singleSelection) {
        Object.assign(
            options,
            {
                // suppressRowClickSelection: false,
                onRangeSelectionChanged: debounce((params) => {
                    let selections = params.api.getRangeSelections(); // 获取选中范围
                    if(!selections) { return; }
                    if(selections.length == 0) { return; }

                    let checkboxCol = ''; // 有选择框的列
                    let allColumns = params.columnApi.getAllColumns(); // 获取当前所有列
                    for(let i=0,len=allColumns.length; i<len; i++) { // 获取有checkbox的列
                        if(allColumns[i].colDef.checkboxSelection) {
                            checkboxCol = allColumns[i].colId;
                            break;
                        }
                    }
                    if(selections[0].columns[0].colId != checkboxCol) { return; } // 判断是否拖选checkbox列
                    let startIdx = selections[0].start.rowIndex; // 选中范围开始行序列
                    let endIdx = selections[0].end.rowIndex; // 选中范围结束行序列

                    // 单选一行时不触发
                    if(startIdx == endIdx) { return; }
                    let selectNode = () => {
                        // 勾选选中范围中的行
                        params.api.forEachNode((node, index) => {
                            // 支持正向拖和反向拖
                            if(index>=startIdx && index<=endIdx) {
                                node.setSelected(true);
                            } else if (index<=startIdx && index>=endIdx) {
                                node.setSelected(true);
                            }
                        })
                    };
                    selectNode();
                }, 100),
                onCellClicked: (params) => {
                    // 点击单元格时取消全选
                    params.api.deselectAll();
                }
            }
        )
    }

    /**
     * v20.0.0新特性 添加状态栏
     */
    if(options.enableRangeSelection && operation){
        options.statusBar = {
            statusPanels: [
                { statusPanel: 'agAggregationComponent' }
            ]
        }
    }

    /**
     * v20.0.0新特性 添加工具栏
     */
    options.sideBar = {
        toolPanels:[
            {
                id: "columns",
                labelDefault: "Columns",
                labelKey: "columns",
                iconKey: "columns",
                toolPanel: "agColumnsToolPanel"
            }
        ]
    }

    /**
     * 是否显示英文（ag-grid 默认是英文）
     */
    if(!localeEn) {
        options.localeText = localeText; //表格字体汉化
    }

    /**
     * defaultColDef 基本配置
     */
    options.defaultColDef = {
        resizable:true,
        sortable:true,
        filter:true,
        enableValue:true,
        enableRowGroup:true
    }

    /**
    * 设置分组列显示
    */
    Object.assign(options,{
        autoGroupColumnDef:{
            headerName:'组',
            menuTabs:[]
        }
    })

    return options;
}

export function columnDefs (){
    return columnDefs;
}
export default gridOptions;