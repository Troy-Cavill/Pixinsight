#include <pjsr/StdButton.jsh>
#include <pjsr/StdIcon.jsh>
#include <pjsr/Sizer.jsh>
#include <pjsr/NumericControl.jsh>

#feature-id    RenameImage : AstroCavill > RenameImage;
#feature-info  Renaming images boiii;

#define DEVELOPER_NAME "Troy Cavill";
#define TITLE "RenameImage";
#define VERSION "0.1";

var ToolParameters = {
    targetView: undefined,
    save: function () {},
    load: function () {}
};

function RenameImage() {
    let defaultName = "TestName";
}

function DialogWindow() {
    this.__base__ = Dialog;
    this.__base__();

    let headerTitle = "<b>" + TITLE + " v" + VERSION + "</b> | " + DEVELOPER_NAME
    let headerDescription = "Renames the desired image"
    let headerSpacer = "<br><br>"
    
    // ------------------------------ header ------------------------------

    this.headerLabel = new Label(this);
    with (this.headerLabel) {
        wordWrapping = true;
        useRichText = true;
        margin = 4;
        text = headerTitle + headerSpacer + headerDescription
    }

    // --------------------------- target chooser -------------------------

    this.targetViewList = new ViewList(this);
    with (this.targetViewList) {
        getMainViews();
        onViewSelected = function (view) {
            ToolParameters.targetView = view;
        }
    }

    this.targetViewSetActiveButton = new ToolButton(this);
    with (this.targetViewSetActiveButton) {
        icon = this.scaledResource(":/icons/select-view.png");
        setScaledFixedSize(20, 20);
        toolTip = "Set active window as target";
        onClick = function () {
            ToolParameters.targetView = ImageWindow.activeWindow.currentView;
            self.targetViewList.currentView = ToolParameters.targetView;
        }
    }

    this.targetGroupBox = new GroupBox(this)
    with (this.targetGroupBox) {
        sizer = new HorizontalSizer(this);
        sizer.margin = 6;
        sizer.add(this.targetViewList);
        sizer.addSpacing(5);
        sizer.add(this.targetViewSetActiveButton);
        title = "Target View";
    }

    // --------------------------- footer buttons -------------------------

    this.newInstanceButton = new ToolButton(this);
    with (this.newInstanceButton) {
        icon = this.scaledResource(":/process-interface/new-instance.png");
        setScaledFixedSize(20, 20);
        toolTip = "New Instance";
        onMousePress = function () {
            this.hasFocus = true;
            ToolParameters.save();

            this.pushed = false;
            this.dialog.newInstance();
        };
    }

    this.okButton = new PushButton(this);
    with (this.okButton) {
        text = "Rename";
        icon = this.scaledResource(":/icons/ok.png");
        onClick = function () {
            this.dialog.ok();
        };
    }

    this.cancelButton = new PushButton(this);
    with (this.cancelButton) {
        text = "Cancel";
        icon = this.scaledResource(":/icons/cancel.png");
        onClick = function () {
            this.dialog.cancel();
        };
    }

    this.footerButtonsSizer = new HorizontalSizer;
    with (this.footerButtonsSizer) {
        scaledSpacing = 6;
        add(this.newInstanceButton);
        addStretch();
        add(this.okButton);
        add(this.cancelButton);
    }

    // --------------------------- window config/layout --------------------------

    this.windowTitle = TITLE;
    var panelWidth = this.font.width(headerTitle);
    this.minWidth = panelWidth;
    this.width = 300;

    this.sizer = new VerticalSizer(this);
    with (this.sizer) {
        margin = 6;
        spacing = 4;
        add(this.headerLabel);
        addSpacing(4);
        add(this.targetGroupBox);
        addSpacing(4);
        addStretch();
        add(this.footerButtonsSizer);
    }
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
       ToolParameters.load(); // Load the parameters in global context
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