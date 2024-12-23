"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    teams: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' }]
});
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
