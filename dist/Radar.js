"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Protocols_AttachCoordinate_Job = void 0;
function Protocols_AttachCoordinate_Job(obA_Prcol) {
    var a1L_Prcols;
    var a1L_NewScan;
    var obL_CoordXY;
    const srL_CTE_CLOSEST_ENEMIES = 'closest-enemies';
    const srL_CTE_FURTHEST_ENEMIES = 'furthest-enemies';
    const srL_CTE_ASSIST_ALLIES = 'assist-allies';
    const srL_CTE_AVOID_CROSSFIRE = 'avoid-crossfire';
    const srL_CTE_PRIORITIZE_MECH = 'prioritize-mech';
    const srL_CTE_AVOID_MECH = 'avoid-mech';
    try {
        a1L_Prcols = obA_Prcol.protocols;
        a1L_NewScan = obA_Prcol.scan;
        a1L_NewScan = a1L_NewScan.filter(a => Math.pow((Math.pow(a.coordinates.x, 2) + Math.pow(a.coordinates.y, 2)), 0.5) <= 100);
        if (a1L_Prcols.indexOf(srL_CTE_ASSIST_ALLIES) > -1) {
            a1L_NewScan = Scan_Filter_AssistAllies_Ja1(a1L_NewScan);
        }
        if (a1L_Prcols.indexOf(srL_CTE_AVOID_CROSSFIRE) > -1) {
            a1L_NewScan = Scan_Filter_AvoidCrossfire_Ja1(a1L_NewScan);
        }
        if (a1L_Prcols.indexOf(srL_CTE_PRIORITIZE_MECH) > -1) {
            a1L_NewScan = Scan_Filter_PrioritizeMech_Ja1(a1L_NewScan);
        }
        if (a1L_Prcols.indexOf(srL_CTE_AVOID_MECH) > -1) {
            a1L_NewScan = Scan_Filter_AvoidMech_Ja1(a1L_NewScan);
        }
        if (a1L_Prcols.indexOf(srL_CTE_CLOSEST_ENEMIES) > -1) {
            a1L_NewScan = Scan_Filter_ClosestEnemies_Ja1(a1L_NewScan);
        }
        if (a1L_Prcols.indexOf(srL_CTE_FURTHEST_ENEMIES) > -1) {
            a1L_NewScan = Scan_Filter_FurthestEnemies_Ja1(a1L_NewScan);
        }
        obL_CoordXY = a1L_NewScan[0].coordinates;
        return obL_CoordXY;
    }
    catch (e) {
        console.log(e);
        return { "x": 0, "y": 0 };
    }
}
exports.Protocols_AttachCoordinate_Job = Protocols_AttachCoordinate_Job;
function Scan_Filter_ClosestEnemies_Ja1(a1A_Scan) {
    var a1L_NewScan;
    try {
        a1L_NewScan = a1A_Scan.sort((a, b) => (Math.pow(a.coordinates.x, 2) + Math.pow(a.coordinates.y, 2)) -
            (Math.pow(b.coordinates.x, 2) + Math.pow(b.coordinates.y, 2)));
        return [a1L_NewScan[0]];
    }
    catch (e) {
        console.log(e);
        return [];
    }
}
function Scan_Filter_FurthestEnemies_Ja1(a1A_Scan) {
    var a1L_NewScan;
    try {
        a1L_NewScan = a1A_Scan.sort((b, a) => (Math.pow(a.coordinates.x, 2) + Math.pow(a.coordinates.y, 2)) -
            (Math.pow(b.coordinates.x, 2) + Math.pow(b.coordinates.y, 2)));
        return [a1L_NewScan[0]];
    }
    catch (e) {
        console.log(e);
        return [];
    }
}
function Scan_Filter_AssistAllies_Ja1(a1A_Scan) {
    var a1L_NewScan;
    var boL_ExistAllies;
    try {
        a1L_NewScan = a1A_Scan.filter(a => (a.allies ? a.allies : 0) > 0);
        boL_ExistAllies = (a1L_NewScan.length > 0);
        if (boL_ExistAllies === false) {
            a1L_NewScan = a1A_Scan;
        }
        if (boL_ExistAllies === true && a1L_NewScan.length > 1) {
            a1L_NewScan = a1A_Scan.sort((b, a) => (a.allies ? a.allies : 0) - (b.allies ? b.allies : 0));
        }
        return a1L_NewScan;
    }
    catch (e) {
        console.log(e);
        return [];
    }
}
function Scan_Filter_AvoidCrossfire_Ja1(a1A_Scan) {
    var a1L_NewScan;
    try {
        a1L_NewScan = a1A_Scan.filter(a => (a.allies ? a.allies : 0) == 0);
        return a1L_NewScan;
    }
    catch (e) {
        console.log(e);
        return [];
    }
}
function Scan_Filter_PrioritizeMech_Ja1(a1A_Scan) {
    var a1L_NewScan;
    try {
        a1L_NewScan = a1A_Scan.filter(a => a.enemies.type == 'mech');
        if (a1L_NewScan.length == 0) {
            a1L_NewScan = a1A_Scan;
        }
        return a1L_NewScan;
    }
    catch (e) {
        console.log(e);
        return [];
    }
}
function Scan_Filter_AvoidMech_Ja1(a1A_Scan) {
    var a1L_NewScan;
    try {
        a1L_NewScan = a1A_Scan.filter(a => a.enemies.type != 'mech');
        return a1L_NewScan;
    }
    catch (e) {
        console.log(e);
        return [];
    }
}
