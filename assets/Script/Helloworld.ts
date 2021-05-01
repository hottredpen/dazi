const {ccclass, property} = cc._decorator;
import PrintChar from "./PrintChar";
// import HttpUtil from "./utils/HttpUtil";
@ccclass
export default class Helloworld extends cc.Component {

    @property({type:cc.Toggle})
    numberToggle: cc.Toggle = null; 
    @property({type:cc.Toggle})
    letterToggle: cc.Toggle = null; 
    @property({type:cc.Toggle})
    letterupperToggle: cc.Toggle = null; 
    @property({type:cc.Toggle})
    fuhaoToggle: cc.Toggle = null; 
    @property({type:cc.Toggle})
    zwfuhaoToggle: cc.Toggle = null; 
    @property({type:cc.Toggle})
    customToggle: cc.Toggle = null; 
    @property({type:cc.ToggleContainer})
    isRandToggleContainer: cc.ToggleContainer = null; 

    @property({type:cc.Prefab,tooltip:'打印字符'})
    printCharPref: cc.Prefab = null; 

    xin:cc.Node = null
    c001:cc.Node = null


    print_char_arr:Array<string> = []
    print_char_index:number = 0;



    // 用户输入的最后一个字符
    lastString:string = ''

    printCharArray:Array<PrintChar> = null // 当前用户需要打的字
    userStringArray:Array<PrintChar> = null // 用户实际打的字

    startBtn:cc.Node = null

    settingBtn:cc.Button = null
    menu:cc.Node = null
    menuBtn:cc.Button = null
    winBtn:cc.Button = null

    open_number:boolean = false
    open_letter:boolean = false
    open_letterupper:boolean = false
    open_fuhao:boolean = false
    open_zwfuhao:boolean = false
    open_custom:boolean = false


    all_number_arr:Array<string> = []
    all_number_zh_arr:Array<string> = []
    all_number_shift_arr:Array<string> = []
    all_number_shift_zh_arr:Array<string> = []
    all_letter_arr:Array<string> = []
    all_letterupper_arr:Array<string> = []
    all_fuhao_arr:Array<string> = []
    all_zwfuhao_arr:Array<string> = []
    all_custom_arr:Array<string> = []

    all_letter_keycode_arr:Array<Number> = null;
    all_number_keycode_arr:Array<Number> = null;

    all_f_arr:Array<string> = []
    all_f_shift_arr:Array<string> = []
    all_f_zh_arr:Array<string> = []
    all_f_shift_zh_arr:Array<string> = []
    all_f_keycode_arr:Array<Number> = null;
    all_g_keycode_arr:Array<Number> = null;


    // 整条生成的需要打印的文字
    all_string_arr:Array<string> = []
    all_string_at_index:0;
    step_length:number = 8 // 8个为一组
    group_index:number = 0 // 第几组
    // 当前文字
    cur_string_arr:Array<string> = []
    cur_string_at_index:number = 0;
    cur_last_index:number = 0;

    is_open_rand:boolean = true

    youWinMenu:cc.Node = null
    http_custom_arr:Array<string> = []


    has_down_keycode_arr:Array<Number> = []

    is_chinese:boolean = false
    langBtn:cc.Button = null
    is_upper:boolean = false
    upperBtn:cc.Button = null

    onLoad(){
        this.is_chinese = false
        this.is_upper = false
        this.is_open_rand = true
        // this.startBtn = this.node.getChildByName('startBtn')
        this.menu = this.node.getChildByName('menu')
        this.settingBtn = this.node.getChildByName('settingBtn').getComponent(cc.Button)
        this.menuBtn = this.node.getChildByName('menu').getChildByName('btn').getComponent(cc.Button)
        this.winBtn = this.node.getChildByName('youWinMenu').getChildByName('btn').getComponent(cc.Button)
        this.youWinMenu = this.node.getChildByName('youWinMenu')
        this.langBtn = this.node.getChildByName('lang_trans').getComponent(cc.Button)
        this.upperBtn = this.node.getChildByName('upper_trans').getComponent(cc.Button)
        // this.startBtn.on(cc.Node.EventType.TOUCH_START, this.startPlay, this);
        this.settingBtn.node.on(cc.Node.EventType.TOUCH_START, this.togetherMenu, this);
        this.menuBtn.node.on(cc.Node.EventType.TOUCH_START, this.startPlay, this);
        this.winBtn.node.on(cc.Node.EventType.TOUCH_START, this.closeWin, this);
        this.langBtn.node.on(cc.Node.EventType.TOUCH_START, this.langBtnClick, this);
        this.upperBtn.node.on(cc.Node.EventType.TOUCH_START, this.upperBtnClick, this);



        this.numberToggle.isChecked = false
        this.letterToggle.isChecked = false
        this.letterupperToggle.isChecked = false
        this.fuhaoToggle.isChecked = false
        this.zwfuhaoToggle.isChecked = false
        this.customToggle.isChecked = false

        this.numberToggle.node.on('toggle', this.numbercallback, this);
        this.letterToggle.node.on('toggle', this.letterTogglecallback, this);
        this.letterupperToggle.node.on('toggle', this.letterupperTogglecallback, this);
        this.fuhaoToggle.node.on('toggle', this.fuhaoTogglecallback, this);
        this.zwfuhaoToggle.node.on('toggle', this.zwfuhaoTogglecallback, this);
        this.customToggle.node.on('toggle', this.customTogglecallback, this);


        this.isRandToggleContainer.node.getChildByName('toggle1').on('toggle', this.toggle1Click, this);
        this.isRandToggleContainer.node.getChildByName('toggle2').on('toggle', this.toggle2Click, this);

        this.xin = this.node.getChildByName('jian').getChildByName('xin')

        
        this.print_char_arr = ['~','$','1',':',';','：','；']
        this.print_char_index = 0
        // this.c001 = cc.find('Canvas/jian/xin/c01')


        this.all_number_arr = ['0','1','2','3','4','5','6','7','8','9']
        this.all_number_shift_arr = [')','!','@','#','$','%','^','&','*','(']
        this.all_number_zh_arr = ['0','1','2','3','4','5','6','7','8','9']
        this.all_number_shift_zh_arr = ['）','！','@','#','￥','%','……','&','*','（']
        this.all_number_keycode_arr = [48,49,50,51,52,53,54,55,56,57]
        
        this.all_letter_arr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        this.all_letterupper_arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        this.all_fuhao_arr = ['~','`','!','@','#','$','%','^','&','*','(',')','-','_','+','=','{','}','[',']','|','\\',':',';','"','\'','<','>',',','.','?','/'];
        this.all_zwfuhao_arr = ['~','·','！','@','#','￥','%','……','&','*','（','）','-','——','+','=','「','」','【','】','|','、','：','；','“','‘','’','《','》','，','。','？','、'];
        
        this.all_letter_keycode_arr = [65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90];
        
        this.all_f_arr = [";","=",",","-",".","/","`","[","\\","]","'"];
        this.all_f_shift_arr = [":","+","<","_",">","?","~","{","|","}","\""];
        this.all_f_zh_arr = ["；","=","，","-","。","、","·","【","、","】","’"];
        this.all_f_shift_zh_arr = ["：","+","《","——","》","？","~","「","|","」","“"];
        this.all_f_keycode_arr = [186,187,188,189,190,191,192,219,220,221,222];

        this.all_g_keycode_arr = [8,9,13,16,17,18,20,32,91];

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

    }
    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    onKeyDown(e){
        if(this.has_down_keycode_arr.indexOf(e.keyCode) == -1){
            this.has_down_keycode_arr.push(e.keyCode)
        }
        console.log('this.has_down_keycode_arr')
        console.log(JSON.stringify(this.has_down_keycode_arr) )
        console.log('key down')
        console.log('e.keyCode',e.keyCode)
        let _in_number_index = this.all_number_keycode_arr.indexOf(e.keyCode)
        let _in_f_index = this.all_f_keycode_arr.indexOf(e.keyCode)
        let _in_g_index = this.all_g_keycode_arr.indexOf(e.keyCode)
        let _in_z_index = this.all_letter_keycode_arr.indexOf(e.keyCode)
        if(_in_number_index > -1){
            this.xin.getChildByName('c_'+e.keyCode).color = cc.Color.GREEN
            setTimeout(() =>{
                this.xin.getChildByName('c_'+e.keyCode).color = new cc.Color(255,255,255,255);
            },100)
        }
        if(_in_f_index > -1){
            this.xin.getChildByName('f_'+e.keyCode).color = cc.Color.GREEN
            setTimeout(() =>{
                this.xin.getChildByName('f_'+e.keyCode).color = new cc.Color(255,255,255,255);
            },100)
        }
        if(_in_z_index > -1){
            this.xin.getChildByName('z_'+e.keyCode).color = cc.Color.GREEN
            setTimeout(() =>{
                this.xin.getChildByName('z_'+e.keyCode).color = new cc.Color(255,255,255,255);
            },100)
        }
        if(_in_g_index > -1){
            if([16,17,18,91].indexOf(e.keyCode) > -1){
                this.xin.getChildByName('g_'+e.keyCode+'_l').color = cc.Color.GREEN
                setTimeout(() =>{
                    this.xin.getChildByName('g_'+e.keyCode+'_l').color = new cc.Color(255,255,255,255);
                },100)
                this.xin.getChildByName('g_'+e.keyCode+'_r').color = cc.Color.GREEN
                setTimeout(() =>{
                    this.xin.getChildByName('g_'+e.keyCode+'_r').color = new cc.Color(255,255,255,255);
                },100)
            }else{
                this.xin.getChildByName('g_'+e.keyCode).color = cc.Color.GREEN
                setTimeout(() =>{
                    this.xin.getChildByName('g_'+e.keyCode).color = new cc.Color(255,255,255,255);
                },100)
            }
        }
    }
    onKeyUp(e){
        console.log('key up')
        let _key_index = this.has_down_keycode_arr.indexOf(e.keyCode)
        if(_key_index > -1){
            this.has_down_keycode_arr.splice(_key_index,1); // 从has_down_keycode_arr中移除
        }
        console.log('this.has_down_keycode_arr')
        console.log(JSON.stringify(this.has_down_keycode_arr) )
        let _string = '';
        let _in_number_index = this.all_number_keycode_arr.indexOf(e.keyCode)
        let _in_f_index = this.all_f_keycode_arr.indexOf(e.keyCode)
        let _in_z_index = this.all_letter_keycode_arr.indexOf(e.keyCode)
        // 按住ctrl的情况  （可能是切换中中文）
        if(this.has_down_keycode_arr.indexOf(17) > -1){
            if(e.keyCode == 16){
                this.langBtnClick()
            }
            if(e.keyCode == 32){
                this.langBtnClick()
            }
        }
        // 按住shift的情况
        if(this.has_down_keycode_arr.indexOf(16) > -1){
            if(_in_number_index > -1){
                if(this.is_chinese){
                    _string = this.all_number_shift_zh_arr[_in_number_index]
                }else{
                    _string = this.all_number_shift_arr[_in_number_index]
                }
            }
            if(_in_f_index > -1){
                if(this.is_chinese){
                    _string = this.all_f_shift_zh_arr[_in_f_index]
                }else{
                    _string = this.all_f_shift_arr[_in_f_index]
                }
            }
            if(_in_z_index > -1){
                if(this.is_upper){
                    _string = this.all_letter_arr[_in_z_index]
                }else{
                    _string = this.all_letterupper_arr[_in_z_index]
                }
            }
        }else{
            if(_in_number_index > -1){
                if(this.is_chinese){
                    _string = this.all_number_zh_arr[_in_number_index]
                }else{
                    _string = this.all_number_arr[_in_number_index]
                }
            }
            if(_in_f_index > -1){
                if(this.is_chinese){
                    _string = this.all_f_zh_arr[_in_f_index]
                }else{
                    _string = this.all_f_arr[_in_f_index]
                }
            }
            if(_in_z_index > -1){
                if(this.is_upper){
                    _string = this.all_letterupper_arr[_in_z_index]
                }else{
                    _string = this.all_letter_arr[_in_z_index]
                }
            }
        }
        if(_string != ''){
            this.addUserPrint(_string,this.printCharArray[this.cur_string_at_index].nodeIndex)
            if(_string == this.printCharArray[this.cur_string_at_index].charString){
                this.printCharArray[this.cur_string_at_index].node.color = cc.Color.YELLOW
                this.userStringArray[this.cur_string_at_index].node.color = cc.Color.GREEN

                if(this.cur_string_at_index == this.cur_last_index){
                    setTimeout(() => {
                        this.nextGroup()
                    },1000)
                }
                this.cur_string_at_index++
                this.all_string_at_index++
            }else{
                this.userStringArray[this.cur_string_at_index].node.color = cc.Color.RED
            }
        }
    }
    langBtnClick(){
        this.is_chinese = !this.is_chinese
        let lang_name = this.is_chinese ? '中' : 'En'
        this.langBtn.node.getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = lang_name
    }
    upperBtnClick(){
        this.is_upper = !this.is_upper
        let upper_name = this.is_upper ? '大写' : '小写'
        this.upperBtn.node.getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = upper_name
    }


    togetherMenu(){
        this.menu.active = !this.menu.active
    }
    numbercallback(e){
        this.open_number = e.isChecked
    }
    letterTogglecallback(e){
        this.open_letter = e.isChecked
    }
    letterupperTogglecallback(e){
        this.open_letterupper = e.isChecked
    }
    fuhaoTogglecallback(e){
        this.open_fuhao = e.isChecked
    }
    zwfuhaoTogglecallback(e){
        this.open_zwfuhao = e.isChecked
    }
    customTogglecallback(e){
        this.open_custom = e.isChecked
    }
    // settingOk(){
    //     this.menu.active = false
    // }

    startPlay(){
        this.menu.active = false
        // this.node.getChildByName('EditBox').active = true
        // console.log(this.open_number)
        // console.log(this.open_letter)
        // console.log(this.open_letterupper)
        // console.log(this.open_fuhao)
        // console.log(this.open_zwfuhao)
        // console.log(this.open_custom)
        // if(window.document){
        //     let that = this

        //     let _input = document.getElementById('EditBoxId_1')
        //     if(_input){
        //         _input.setAttribute("autocomplete","off");
        //     }
            
        //     let _input2 = document.getElementById('EditBoxId_2')
        //     if(_input2){
        //         _input2.setAttribute("autocomplete","off");
        //     }
        // }
        // console.log(this.is_open_rand)



        this.cur_string_at_index = 0
        this.all_string_at_index = 0
        this.group_index = 0

        this.all_string_arr = [];

        if(this.open_number){
            this.all_string_arr = this.all_string_arr.concat(this.all_number_arr);
        }
        if(this.open_letter){
            this.all_string_arr = this.all_string_arr.concat(this.all_letter_arr);
        }
        if(this.open_letterupper){
            this.all_string_arr = this.all_string_arr.concat(this.all_letterupper_arr);
        }
        if(this.open_fuhao){
            this.all_string_arr = this.all_string_arr.concat(this.all_fuhao_arr);
        }
        if(this.open_zwfuhao){
            this.all_string_arr = this.all_string_arr.concat(this.all_zwfuhao_arr);
        }

        let allString = this.node.getChildByName('menu').getChildByName('allString').getChildByName('TEXT_LABEL').getComponent(cc.Label).string
        let _custom_arr = allString.split('')
        if(this.open_custom){
            if(_custom_arr.length > 0){
                this.all_string_arr = this.all_string_arr.concat(_custom_arr);
            }
        }
        // if(_custom_arr.length == 0){
        //     this.all_string_arr = this.all_string_arr.concat(this.http_custom_arr);
        // }

        if(this.all_string_arr.length == 0){
            this.all_string_arr = ['#','@','*','、','！','？']
        }

        if(this.is_open_rand){
            let randomsort = function(a, b){
                return Math.random()>.5 ? -1 : 1;
                //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
            }
            this.all_string_arr.sort(randomsort);
        }
        this.getCurGroupAndShow()
    }

    getCurGroupAndShow(){
        this.userStringArray = []
        this.node.getChildByName('curStringNode').removeAllChildren(true)
        this.node.getChildByName('userStringNode').removeAllChildren(true)
        // 获取
        this.cur_string_arr = this.all_string_arr.slice(this.all_string_at_index,(this.group_index+1)*this.step_length)

        if(this.cur_string_arr.length == 0){
            this.node.getChildByName('EditBox').active = false
            this.youWinMenu.active = true
        }
        this.cur_last_index = this.cur_string_arr.length - 1

        this.cur_string_arr.forEach( (_item,_index) => {
            let _node:cc.Node = cc.instantiate(this.printCharPref)
            let printChar:PrintChar = _node.getComponent(PrintChar)

            _node.getChildByName('label').getComponent(cc.Label).string = _item
            printChar.charString = _item
            printChar.nodeIndex = _index
            _node.x = _index*100 - 350
            _node.y = 0
            this.printCharArray[_index] = printChar
            this.node.getChildByName('curStringNode').addChild(_node)
        } ) 
    }
    closeWin(){
        this.menu.active = true
        this.youWinMenu.active = false
    }

    nextGroup(){
        this.cur_string_at_index = 0
        this.group_index++;
        this.getCurGroupAndShow()

    }
   
    addUserPrint(str,_index){

        if( this.userStringArray[_index]){
            this.userStringArray[_index].node.getChildByName('label').getComponent(cc.Label).string = str
        }else{
            let _node:cc.Node = cc.instantiate(this.printCharPref)
            let printChar:PrintChar = _node.getComponent(PrintChar)
    
            _node.getChildByName('label').getComponent(cc.Label).string = str
            printChar.charString = str
            printChar.nodeIndex = _index
            _node.x = _index*100 - 350
            _node.y = 0
    
            this.userStringArray[_index] = printChar
            this.node.getChildByName('userStringNode').addChild(_node)
        }
        
        
    }

    start () {
        // this.httpGet("http://dazi.jk-kj.com/diy.json", (res) => {
        //     this.http_custom_arr = res
        // })
        this.printCharArray = []
        this.userStringArray = []
        this.print_char_index = 0
    }
    toggle1Click(){
        this.is_open_rand = false
    }
    toggle2Click(){
        this.is_open_rand = true
    }

    httpGet(url, callback) {
        // cc.myGame.gameUi.onShowLockScreen();
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            // cc.log("Get: readyState:" + xhr.readyState + " status:" + xhr.status);
            if (xhr.readyState === 4 && xhr.status == 200) {
                let respone = xhr.responseText;
                let rsp = JSON.parse(respone);
                // cc.myGame.gameUi.onHideLockScreen();
                callback(rsp);
            } else if (xhr.readyState === 4 && xhr.status == 401) {
                // cc.myGame.gameUi.onHideLockScreen();
                callback({status:401});
            } else {
                //callback(-1);
            }
        };
        xhr.withCredentials = true;
        xhr.open('GET', url, true);
 
        // if (cc.sys.isNative) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type,authorization');
        xhr.setRequestHeader("Content-Type", "application/json");
        // xhr.setRequestHeader('Authorization', 'Bearer ' + cc.myGame.gameManager.getToken());
        // xhr.setRequestHeader('Authorization', 'Bearer ' + "");
        // }
 
        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 8000;// 8 seconds for timeout
 
        xhr.send();
    }
}
