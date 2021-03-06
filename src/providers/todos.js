var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
var Todos = (function () {
    function Todos() {
        this.db = new PouchDB('cloudo');
        this.db = new PouchDB('cloudo');
        this.username = 'pecionsistardsomporthely';
        this.password = 'd72fa1ceaaed506a0621079c6945093322c9cd43';
        this.remote = 'https://oussemalaamiri.cloudant.com/museums/';
        var options = {
            live: true,
            retry: true,
            continuous: true,
            auth: {
                username: this.username,
                password: this.password
            }
        };
        this.db.sync(this.remote, options);
    }
    Todos.prototype.getTodos = function () {
        var _this = this;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(function (resolve) {
            _this.db.allDocs({
                include_docs: true
            }).then(function (result) {
                _this.data = [];
                var docs = result.rows.map(function (row) {
                    _this.data.push(row.doc);
                });
                resolve(_this.data);
                _this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', function (change) {
                    _this.handleChange(change);
                });
            }).catch(function (error) {
                console.log(error);
            });
        });
    };
    Todos.prototype.createTodo = function (todo) {
        this.db.post(todo);
    };
    Todos.prototype.updateTodo = function (todo) {
        this.db.put(todo).catch(function (err) {
            console.log(err);
        });
    };
    Todos.prototype.deleteTodo = function (todo) {
        this.db.remove(todo).catch(function (err) {
            console.log(err);
        });
    };
    Todos.prototype.handleChange = function (change) {
        var changedDoc = null;
        var changedIndex = null;
        this.data.forEach(function (doc, index) {
            if (doc._id === change.id) {
                changedDoc = doc;
                changedIndex = index;
            }
        });
        //A document was deleted
        if (change.deleted) {
            this.data.splice(changedIndex, 1);
        }
        else {
            //A document was updated
            if (changedDoc) {
                this.data[changedIndex] = change.doc;
            }
            else {
                this.data.push(change.doc);
            }
        }
    };
    return Todos;
}());
Todos = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], Todos);
export { Todos };
//# sourceMappingURL=todos.js.map