import {Meteor} from "meteor/meteor";
import {ContactsCollection} from "./Contact";

Meteor.methods({
    'contacts.insert': ({name, email, profileImageUrl}) => {
        if(!name || !email || !profileImageUrl) {
            throw new Meteor.Error( (!name ? 'Name' : !email ? 'Email Address' : 'Profile image Url') + ' is required')
        }
        return ContactsCollection.insert({
            name, email, profileImageUrl,
            addedOn: new Date().toUTCString()
        })
    }
})