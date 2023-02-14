"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtoMessage = exports.ProtoService = exports.ProtoServiceMethod = exports.ProtoEnum = void 0;
var react_1 = __importDefault(require("react"));
var Link_1 = __importDefault(require("@docusaurus/Link"));
var leftHeaderStyles = {
    textAlign: "left",
};
var ProtoEnum = function (props) {
    var enumb = props.enumb;
    var ValueHeaders = function () { return (react_1.default.createElement("thead", null,
        react_1.default.createElement("tr", null,
            react_1.default.createElement("th", null, "Name"),
            react_1.default.createElement("th", null, "Number"),
            react_1.default.createElement("th", null, "Description")))); };
    var ValueRows = function () { return (react_1.default.createElement("tbody", null, enumb.values.map(function (enumValue) { return (react_1.default.createElement("tr", { key: enumValue.name },
        react_1.default.createElement("td", null,
            react_1.default.createElement("code", null, enumValue.name)),
        react_1.default.createElement("td", null,
            react_1.default.createElement("code", null, enumValue.number)),
        react_1.default.createElement("td", { style: { whiteSpace: 'pre-wrap' } }, enumValue.description))); }))); };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("p", { style: { whiteSpace: 'pre-wrap' } }, enumb.description),
        react_1.default.createElement("table", null,
            react_1.default.createElement(ValueHeaders, null),
            react_1.default.createElement(ValueRows, null))));
};
exports.ProtoEnum = ProtoEnum;
var ProtoServiceMethod = function (_a) {
    var method = _a.method;
    return (react_1.default.createElement("table", null,
        react_1.default.createElement("tbody", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { style: leftHeaderStyles }, "Method"),
                react_1.default.createElement("td", null,
                    react_1.default.createElement("code", null, method.name))),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { style: leftHeaderStyles }, "Request"),
                react_1.default.createElement("td", null,
                    react_1.default.createElement(Link_1.default, { to: method.requestTypeLink },
                        react_1.default.createElement("code", null, method.requestType)),
                    method.requestStreaming === true ? ' stream' : '')),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { style: leftHeaderStyles }, "Response"),
                react_1.default.createElement("td", null,
                    react_1.default.createElement(Link_1.default, { to: method.responseTypeLink },
                        react_1.default.createElement("code", null, method.responseType)),
                    method.responseStreaming === true ? ' stream' : '')),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { style: leftHeaderStyles }, "Description"),
                react_1.default.createElement("td", null, method.description)))));
};
exports.ProtoServiceMethod = ProtoServiceMethod;
var ProtoServiceMethods = function (props) {
    var methods = props.methods;
    return (react_1.default.createElement(react_1.default.Fragment, null, methods.map(function (method, i) { return (react_1.default.createElement(exports.ProtoServiceMethod, { method: method, key: method.name + "-" + i })); })));
};
var ProtoService = function (props) {
    var service = props.service;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("p", { style: { whiteSpace: 'pre-wrap' } }, service.description),
        react_1.default.createElement(ProtoServiceMethods, { methods: service.methods })));
};
exports.ProtoService = ProtoService;
var ProtoMessageFields = function (props) {
    var fields = props.fields;
    var Headers = function () { return (react_1.default.createElement("thead", null,
        react_1.default.createElement("tr", null,
            react_1.default.createElement("th", null, "Name"),
            react_1.default.createElement("th", null, "Type"),
            react_1.default.createElement("th", null, "Description")))); };
    var FieldTypeCell = function (_a) {
        var field = _a.field;
        var rawCell = (react_1.default.createElement("code", null, field.longType));
        return (field.typeLink === undefined ? rawCell : react_1.default.createElement(Link_1.default, { to: field.typeLink }, rawCell));
    };
    var FieldRows = function () { return (react_1.default.createElement("tbody", null, fields.map(function (field) { return (react_1.default.createElement("tr", { key: field.name },
        react_1.default.createElement("td", null,
            react_1.default.createElement("code", null, field.name)),
        react_1.default.createElement("td", null,
            react_1.default.createElement(FieldTypeCell, { field: field })),
        react_1.default.createElement("td", { style: { whiteSpace: 'pre-wrap' } }, field.description))); }))); };
    return (react_1.default.createElement("table", null,
        react_1.default.createElement(Headers, null),
        react_1.default.createElement(FieldRows, null)));
};
var ProtoMessage = function (props) {
    var message = props.message;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("p", { style: { whiteSpace: 'pre-wrap' } }, message.description),
        react_1.default.createElement(ProtoMessageFields, { fields: message.fields })));
};
exports.ProtoMessage = ProtoMessage;
var ProtoFile = function (props) {
    var fileDescriptor = props.fileDescriptor, components = props.components;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(components.h1, null, fileDescriptor.name),
        react_1.default.createElement("p", { style: { whiteSpace: 'pre-wrap' } }, fileDescriptor.description),
        fileDescriptor.messages.map(function (message, i) { return (react_1.default.createElement(exports.ProtoMessage, { message: message, key: i })); })));
};
exports.default = ProtoFile;
