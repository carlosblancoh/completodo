import Item from './Item';

class Note extends Item {
    static empty() {
        let obj = new Note();
        obj.text = null;
        obj.scheduledDate = null;
        obj.location = null;
        obj.attachment = null;
    }
}