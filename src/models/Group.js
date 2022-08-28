import Item from './Item';

class Group extends Item {
    static empty() {
        let obj = new Group();
        obj.color = '#5856d6';
        obj.deadLine = null;
        obj.completedTasks = null;
        obj.pendingTasks = null;
        obj.averageTaskDuration = null;
        /**ordenar por */
    }
}