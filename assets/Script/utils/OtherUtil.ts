export default class OtherUtil {

    /**
     * tools获取当前节点转换到目标节点下在坐标
     * @param curNode 需要转换的单位节点
     * @param targetNode 目标坐标系节点
     */
    public static setPositionByNode (curNode:cc.Node,targetnode:cc.Node) {
        return targetnode.parent.convertToNodeSpaceAR(curNode.convertToWorldSpaceAR(cc.Vec2.ZERO));
    }

}