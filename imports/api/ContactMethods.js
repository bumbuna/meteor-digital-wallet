import { Meteor } from "meteor/meteor";
import { ContactsCollection } from "./Contact";

Meteor.methods({
    'contacts.insert': function ({ name, email, profileImageUrl }) {
        if (!name || !email || !profileImageUrl) {
            throw new Meteor.Error((!name ? 'Name' : !email ? 'Email Address' : 'Profile image Url') + ' is required')
        }
        return ContactsCollection.insert({
            name, email, profileImageUrl,
            addedOn: new Date()
        })
    },
    'contacts.remove': function ({ id }) {
        if (!id) {
            throw new Meteor.Error('please provide a valid Id')
        }
        return ContactsCollection.remove({ _id: id })
    }
})