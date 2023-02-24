import { Meteor } from 'meteor/meteor'
import { ContactsCollection } from './Contact'

Meteor.publish(
    'allcontacts',
    function () {
        return ContactsCollection.find({});
    }
)