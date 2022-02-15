/**----DESCRIPTION:                 [TASK_47]
*        Dedicated module for processing functions of droid
*         requests by "/radar"
*
*        CREATED: 2022-02-15 12:32:30, BY: GEN57.com, USER_001
*
*    INPUT:
*
*    OUTPUT:
**/

import {Coordinates, JsonIn_Protocols, Scan} from './JsonTypes';

export function Protocols_AttachCoordinate_Job(obA_Prcol: JsonIn_Protocols): Coordinates {
    /**----DESCRIPTION:                 [TASK_47]
    *        This function manages all the decision making of t
    *        he chosen coordinate to attack. So the droid knows
    *         which target to choose.
    *
    *        CREATED: 2022-02-15 12:48:05, BY: GEN57.com, USER_001
    *
    *    INPUT:
    *        obA_Prcol: JsonIn_Protocols:
    *            Input received from the droid so that this endpoin
    *            t decides which of all the coordinates to attack, 
    *            based on distances, allies and types of enemies.+
    *
    *    OUTPUT:
    *        An XY coordinate to attack. But if something fails
    *        , it will return coordinate x=0, y=0: Example json
    *        : {"x":0,"y":40}
    **/

    /* Input Example
		{   "protocols":["avoid-mech"],
			"scan":[{   "coordinates":{"x":0,"y":40},
						"enemies":{"type":"soldier","number":10}},
					{   "coordinates":{"x":0,"y":80},
						"allies":5,
						"enemies":{"type":"mech","number":1}}]
		}  //{"x":0,"y":40}

        OUTPUT json:
            {"x":0,"y":40}

- **Protocolos disponibles:**
    -	*closest-enemies* : Se deberá priorizar el punto más cercano en el que haya enemigos.
    -	*furthest-enemies* : Se deberá priorizar el punto más lejano en el que haya enemigos.
    -	*assist-allies* : Deberan de priorizarse los puntos en los que exista algún aliado.
    -	*avoid-crossfire* : No debe de atacarse ningún punto en el que haya algún aliado.
    -	*prioritize-mech* : Debe de atacarse unm ech si se encuentra. En caso negativo, cualquier otro tipo deobjetivo será válido.
    -	*avoid-mech* : No debe de atacarse ningún enemigo del tipo mech

    */

    //VARIABLES:
		var a1L_Prcols: string[];
		var a1L_NewScan: Scan[];
		var obL_CoordXY: Coordinates;

		//Const
			const srL_CTE_CLOSEST_ENEMIES = 'closest-enemies';//Sort
			const srL_CTE_FURTHEST_ENEMIES = 'furthest-enemies';//Sort
			const srL_CTE_ASSIST_ALLIES = 'assist-allies';// Filter allies
			const srL_CTE_AVOID_CROSSFIRE = 'avoid-crossfire';//Filter no allies
			const srL_CTE_PRIORITIZE_MECH = 'prioritize-mech';//Filter mech
			const srL_CTE_AVOID_MECH = 'avoid-mech';//Filter No mech
			
    //'ERROR CONTROL - START:
        try {
        
    //'INITIAL AND DEFAULT VALUES:
		a1L_Prcols = obA_Prcol.protocols;// ["closest-enemies", "furthest-enemies"]
		a1L_NewScan = obA_Prcol.scan;//[{.}, {.}, ] = [{ "coordinates":{"x":0,"y":40},"enemies":{"type":"soldier","number":10}]

    //'VALIDATIONS TO AVOID FAILURES:
			//if (a1L_Prcols.length == 0){return {ErrMsg: "Protocols doesn't exist"};}
			//if (a1L_NewScan.length == 0){return {ErrMsg: "Scan doesn't exist"};}

    //'START THE PROCESS:

		//Distances greater than 100m skip
			a1L_NewScan = a1L_NewScan.filter( a => (a.coordinates.x**2 + a.coordinates.y**2)**0.5 <= 100 );

		//Filter Scan first
			if (a1L_Prcols.indexOf(srL_CTE_ASSIST_ALLIES) > -1)  {a1L_NewScan = Scan_Filter_AssistAllies_Ja1(a1L_NewScan);}
			if (a1L_Prcols.indexOf(srL_CTE_AVOID_CROSSFIRE) > -1){a1L_NewScan = Scan_Filter_AvoidCrossfire_Ja1(a1L_NewScan);}
			if (a1L_Prcols.indexOf(srL_CTE_PRIORITIZE_MECH) > -1){a1L_NewScan = Scan_Filter_PrioritizeMech_Ja1(a1L_NewScan);}
			if (a1L_Prcols.indexOf(srL_CTE_AVOID_MECH) > -1)	 {a1L_NewScan = Scan_Filter_AvoidMech_Ja1(a1L_NewScan);}
			
		//Sort by distance (x^2 + y^2)^0.5
			if (a1L_Prcols.indexOf(srL_CTE_CLOSEST_ENEMIES) > -1) {a1L_NewScan = Scan_Filter_ClosestEnemies_Ja1(a1L_NewScan);}
			if (a1L_Prcols.indexOf(srL_CTE_FURTHEST_ENEMIES) > -1){a1L_NewScan = Scan_Filter_FurthestEnemies_Ja1(a1L_NewScan);}
			
		//Get coordinates
			obL_CoordXY = a1L_NewScan[0].coordinates; // {"x":0,"y":40}

    //OUTPUT:
		return obL_CoordXY;// {"x":0,"y":40}

    //'ERROR CONTROL - END:
        } catch(e){
            console.log(e);
			return {"x": 0, "y": 0};
        }  
}

function Scan_Filter_ClosestEnemies_Ja1(a1A_Scan: Scan[]): Scan[] {
    /**----DESCRIPTION:                 [TASK_47]
    *        The closest point where there are enemies should b
    *        e prioritized
    *
    *        CREATED: 2022-02-15 12:36:33, BY: GEN57.com, USER_001
    *
    *    INPUT:
    *        a1A_Scan: Scan[]:
    *            Array1d Scan with coordiantes to be filtered
    *
    *    OUTPUT:
    *        A filtered "scan" array a1
    **/

    /* Input Example
            "scan":[{   "coordinates":{"x":0,"y":40},
                        "enemies":{"type":"soldier","number":10}},
                    {   "coordinates":{"x":0,"y":80},
                        "allies":5,
                        "enemies":{"type":"mech","number":1}}]
    */

    //VARIABLES:
		var a1L_NewScan: Scan[];

    //'ERROR CONTROL - START:
        try {
        
    //'INITIAL AND DEFAULT VALUES:

    //'VALIDATIONS TO AVOID FAILURES:

    //'START THE PROCESS:

		//Sort Closest Enemies
			a1L_NewScan = a1A_Scan.sort((a, b) => (a.coordinates.x**2 + a.coordinates.y**2) - 
											   	  (b.coordinates.x**2 + b.coordinates.y**2));// Sort by: (x^2 + y^2)

    //OUTPUT:
		return [a1L_NewScan[0]];//[{..}] = [{ "coordinates":{"x":0,"y":40},"enemies":{"type":"soldier","number":10}]

    //'ERROR CONTROL - END:
        } catch(e){
            console.log(e);
			return [];
        }  
}

function Scan_Filter_FurthestEnemies_Ja1(a1A_Scan: Scan[]): Scan[] {
    /**----DESCRIPTION:                 [TASK_47]
    *        The furthest point where there are enemies should 
    *        be prioritized
    *
    *        CREATED: 2022-02-15 12:37:57, BY: GEN57.com, USER_001
    *
    *    INPUT:
    *        a1A_Scan: Scan[]:
    *            Array1d Scan with coordiantes to be filtered
    *
    *    OUTPUT:
    *        A filtered "scan" array a1
    **/

    /* Input Example
            "scan":[{   "coordinates":{"x":0,"y":40},
                        "enemies":{"type":"soldier","number":10}},
                    {   "coordinates":{"x":0,"y":80},
                        "allies":5,
                        "enemies":{"type":"mech","number":1}}]
    */

    //VARIABLES:
		var a1L_NewScan: Scan[];

    //'ERROR CONTROL - START:
        try {
        
    //'INITIAL AND DEFAULT VALUES:

    //'VALIDATIONS TO AVOID FAILURES:

    //'START THE PROCESS:

		//Sort Furthest Enemies
			a1L_NewScan = a1A_Scan.sort((b, a) => (a.coordinates.x**2 + a.coordinates.y**2) - 
											   	  (b.coordinates.x**2 + b.coordinates.y**2));// Sort by: (x^2 + y^2) 

    //OUTPUT:
		return [a1L_NewScan[0]];//[{..}] = [{ "coordinates":{"x":0,"y":40},"enemies":{"type":"soldier","number":10}]

    //'ERROR CONTROL - END:
        } catch(e){
            console.log(e);
			return [];
        }  
}

function Scan_Filter_AssistAllies_Ja1(a1A_Scan: Scan[]): Scan[] {
    /**----DESCRIPTION:                 [TASK_47]
    *        You must prioritize the points where there is an a
    *        lly
    *
    *        CREATED: 2022-02-15 12:39:14, BY: GEN57.com, USER_001
    *
    *    INPUT:
    *        a1A_Scan: Scan[]:
    *            Array1d Scan with coordiantes to be filtered
    *
    *    OUTPUT:
    *        A filtered "scan" array a1
    **/

    /* Input Example
            "scan":[{   "coordinates":{"x":0,"y":40},
                        "enemies":{"type":"soldier","number":10}},
                    {   "coordinates":{"x":0,"y":80},
                        "allies":5,
                        "enemies":{"type":"mech","number":1}}]
    */

    //VARIABLES:
		var a1L_NewScan: Scan[];
		var boL_ExistAllies: boolean;

    //'ERROR CONTROL - START:
        try {
        
    //'INITIAL AND DEFAULT VALUES:

    //'VALIDATIONS TO AVOID FAILURES:

    //'START THE PROCESS:

		//Filter By Allies
			a1L_NewScan = a1A_Scan.filter( a => (a.allies ? a.allies : 0) > 0);//Some allies

			//If Allies doesn't exist then return original
				boL_ExistAllies = (a1L_NewScan.length > 0);

				if (boL_ExistAllies === false){ a1L_NewScan = a1A_Scan;}

		//Sort by more allies first
			if ( boL_ExistAllies === true && a1L_NewScan.length > 1){
				a1L_NewScan = a1A_Scan.sort((b, a) => (a.allies ? a.allies : 0) - (b.allies ? b.allies : 0) );//More allies
			}

    //OUTPUT:
		return a1L_NewScan;//[{..}] = [{ "coordinates":{"x":0,"y":40},"enemies":{"type":"soldier","number":10}]

    //'ERROR CONTROL - END:
        } catch(e){
            console.log(e);
			return [];
        }  
}

function Scan_Filter_AvoidCrossfire_Ja1(a1A_Scan: Scan[]): Scan[] {
    /**----DESCRIPTION:                 [TASK_47]
    *        You should not attack any point where there is an 
    *        ally
    *
    *        CREATED: 2022-02-15 12:40:11, BY: GEN57.com, USER_001
    *
    *    INPUT:
    *        a1A_Scan: Scan[]:
    *            Array1d Scan with coordiantes to be filtered
    *
    *    OUTPUT:
    *        A filtered "scan" array a1
    **/

    /* Input Example
            "scan":[{   "coordinates":{"x":0,"y":40},
                        "enemies":{"type":"soldier","number":10}},
                    {   "coordinates":{"x":0,"y":80},
                        "allies":5,
                        "enemies":{"type":"mech","number":1}}]
    */

    //VARIABLES:
		var a1L_NewScan: Scan[];

    //'ERROR CONTROL - START:
        try {
        
    //'INITIAL AND DEFAULT VALUES:

    //'VALIDATIONS TO AVOID FAILURES:

    //'START THE PROCESS:

		//Filter Allies = 0
			a1L_NewScan = a1A_Scan.filter( a => (a.allies ? a.allies : 0) == 0);

    //OUTPUT:
		return a1L_NewScan;// [{..}, {..}, ..]

    //'ERROR CONTROL - END:
        } catch(e){
            console.log(e);
			return [];
        }  
}

function Scan_Filter_PrioritizeMech_Ja1(a1A_Scan: Scan[]): Scan[] {
    /**----DESCRIPTION:                 [TASK_47]
    *        Must attack a mech if found. If not, any other typ
    *        e of objective will be valid.
    *
    *        CREATED: 2022-02-15 12:41:03, BY: GEN57.com, USER_001
    *
    *    INPUT:
    *        a1A_Scan: Scan[]:
    *            Array1d Scan with coordiantes to be filtered
    *
    *    OUTPUT:
    *        A filtered "scan" array a1
    **/

    /* Input Example
            "scan":[{   "coordinates":{"x":0,"y":40},
                        "enemies":{"type":"soldier","number":10}},
                    {   "coordinates":{"x":0,"y":80},
                        "allies":5,
                        "enemies":{"type":"mech","number":1}}]
    */

    //VARIABLES:
		var a1L_NewScan: Scan[];

    //'ERROR CONTROL - START:
        try {
        
    //'INITIAL AND DEFAULT VALUES:

    //'VALIDATIONS TO AVOID FAILURES:

    //'START THE PROCESS:

		//Filter by Mech
			a1L_NewScan = a1A_Scan.filter( a => a.enemies.type == 'mech');

			//If Mech doesn't exist then return original
				if (a1L_NewScan.length == 0){ a1L_NewScan = a1A_Scan;}

    //OUTPUT:
		return a1L_NewScan;// [{..}, {..}, ..]

    //'ERROR CONTROL - END:
        } catch(e){
            console.log(e);
			return [];
        }  
}

function Scan_Filter_AvoidMech_Ja1(a1A_Scan: Scan[]): Scan[] {
    /**----DESCRIPTION:                 [TASK_47]
    *        No Mech-type enemies should be attacked.
    *
    *        CREATED: 2022-02-15 12:41:55, BY: GEN57.com, USER_001
    *
    *    INPUT:
    *        a1A_Scan: Scan[]:
    *            Array1d Scan with coordiantes to be filtered
    *
    *    OUTPUT:
    *        A filtered "scan" array a1
    **/

    /* Input Example
            "scan":[{   "coordinates":{"x":0,"y":40},
                        "enemies":{"type":"soldier","number":10}},
                    {   "coordinates":{"x":0,"y":80},
                        "allies":5,
                        "enemies":{"type":"mech","number":1}}]
    */

    //VARIABLES:
		var a1L_NewScan: Scan[];

    //'ERROR CONTROL - START:
        try {
        
    //'INITIAL AND DEFAULT VALUES:

    //'VALIDATIONS TO AVOID FAILURES:

    //'START THE PROCESS:

		//Filter Not Mech
			a1L_NewScan = a1A_Scan.filter( a => a.enemies.type != 'mech');

    //OUTPUT:
		return a1L_NewScan;// [{..}, {..}, ..]

    //'ERROR CONTROL - END:
        } catch(e){
            console.log(e);
			return [];
        }  
}