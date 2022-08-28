import Item from './Item';

class Task extends Item {
    static empty() {
        let obj = new Task();
        obj.completed = false;
        obj.text = '';
        obj.scheduledDate = null;
        obj.deadLine = null;
        obj.duration = null;
        obj.priority = null;
        obj.difficulty = null;
        obj.location = null;
        obj.attachment = null;
    }
}