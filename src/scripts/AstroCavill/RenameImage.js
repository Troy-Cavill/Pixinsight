function RenameImage() {
    let defaultName = "hello";
}

function DialogWindow() {
    this.__base__ = Dialog;
    this.__base__();
}

function showDialog() {
    let dialog = new DialogWindow;
    return dialog.execute();
}

DialogWindow.prototype = new Dialog;

function main() {
    let execute;

    if (Parameters.isViewTarget) {
       ToolParameters.load();
       ToolParameters.targetView = Parameters.targetView; //Parameters.targetView is the image being applied to
       execute = 1;
    }
    else if (Parameters.isGlobalTarget) {
       ToolParameters.load();// Load the parameters in global context
       execute = showDialog();
    } 
    else {
        execute = showDialog();
    }

    if (execute) {
        RenameImage()
    }
}

main();