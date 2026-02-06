#targetengine "session"

(function () {
    var TASK_NAME = "K4SinglePubEnforcer";
    var CHECK_INTERVAL = 1000; // milliseconds between checks
    var hasPrompted = false;

    // Clean up any existing task from a previous session
    for (var i = app.idleTasks.length - 1; i >= 0; i--) {
        if (app.idleTasks[i].name === TASK_NAME) {
            app.idleTasks[i].remove();
        }
    }

    var task = app.idleTasks.add({ name: TASK_NAME, sleep: CHECK_INTERVAL });

    task.addEventListener(IdleEvent.ON_IDLE, function (evt) {
        try {
            var pubs = app.k4Publications;
            if (pubs.length <= 1) {
                // 0 or 1 pub — nothing to do. Reset flag so if they
                // log in to multiple pubs later in the session, we catch it.
                hasPrompted = false;
                task.sleep = 5000;
                return;
            }

            if (hasPrompted) return; // don't nag repeatedly in the same session

            // Build list of publication names
            var pubNames = [];
            for (var i = 0; i < pubs.length; i++) {
                pubNames.push(pubs[i].k4Name);
            }

            var chosen = app.dialogs.add({ name: "Multiple K4 Publications Detected" });
            // InDesign/InCopy dialogs are limited, so use a simpler prompt approach:

            // --- Use a ScriptUI dialog for better UX ---
            var w = new Window("dialog", "Multiple K4 Logins Detected");
            w.orientation = "column";
            w.alignChildren = ["fill", "top"];

            w.add("statictext", undefined, "You are logged into multiple publications.");
            w.add("statictext", undefined, "Please choose the one you need:");

            var dropdown = w.add("dropdownlist", undefined, pubNames);
            dropdown.selection = 0;

            var btnGroup = w.add("group");
            btnGroup.alignment = ["center", "center"];
            btnGroup.add("button", undefined, "OK", { name: "ok" });
            btnGroup.add("button", undefined, "Cancel", { name: "cancel" });

            var result = w.show();

            if (result === 1 && dropdown.selection !== null) {
                var keepName = dropdown.selection.text;
                for (var j = pubs.length - 1; j >= 0; j--) {
                    if (pubs[j].k4Name !== keepName) {
                        pubs[j].k4LogOut();
                    }
                }
            }

            hasPrompted = true;
            task.sleep = 5000;


        } catch (e) {
            // Silently ignore errors — K4 objects may not be available
            // if plugin hasn't fully initialized yet
        }
    });
})();
