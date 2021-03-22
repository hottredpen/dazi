// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class PrintChar extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    charString:string = null
    nodeIndex:number = 0

    start () {

    }

    // update (dt) {}
}
