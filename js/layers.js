addLayer("pa", {
    name: "Pra Pa", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
   
})
if (hasAchievement("a", 13)) mult = mult.times(1.1);
			if (hasAchievement("a", 32)) mult = mult.times(2);
			if (hasUpgrade("PA", 21)) mult = mult.times(((Array.isArray(tmp.ma.mastered))?tmp.ma.mastered.includes(this.layer):false)?1e50:1.8);
			if (hasUpgrade("PA", 23)) mult = mult.times(upgradeEffect("p", 23));
			if (hasUpgrade("PA", 41)) mult = mult.times(upgradeEffect("p", 41));
			if (hasUpgrade("b", 11)) mult = mult.times(upgradeEffect("b", 11));
			if (hasUpgrade("g", 11)) mult = mult.times(upgradeEffect("g", 11));
			if (player.t.unlocked) mult = mult.times(tmp.t.enEff);
			if (player.e.unlocked) mult = mult.times(tmp.e.buyables[11].effect.first);
			if (player.s.unlocked) mult = mult.times(buyableEffect("s", 11));
			if (hasUpgrade("e", 12)) mult = mult.times(upgradeEffect("e", 12));
			if (hasUpgrade("b", 31)) mult = mult.times(upgradeEffect("b", 31));
            return mult
		  },
        gainExp() { // Calculate the exponent on main currency from bonuses
            let exp = new Decimal(1)
			if (hasUpgrade("PA", 31)) exp = exp.times(1.95);
			return exp;
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "p", description: "Press P to Prestige.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
		passiveGeneration() { return (hasMilestone("g", 1)&&player.ma.current!="p")?1:0 },
		doReset(resettingLayer) {
			let keep = [];
			if (hasMilestone("b", 0) && resettingLayer=="b") keep.push("upgrades")
			if (hasMilestone("g", 0) && resettingLayer=="g") keep.push("upgrades")
			if (hasMilestone("e", 1) && resettingLayer=="e") keep.push("upgrades")
			if (hasMilestone("t", 1) && resettingLayer=="t") keep.push("upgrades")
			if (hasMilestone("s", 1) && resettingLayer=="s") keep.push("upgrades")
			if (hasAchievement("a", 41)) keep.push("upgrades")
			if (layers[resettingLayer].row > this.row) layerDataReset("p", keep)
		},
		startData() { return {
			unlocked: false,
			points: new Decimal(0),
			best: new Decimal(0),
			total: new Decimal(0),
			pseudoUpgs: [],
			first: 0,
		}},
		upgrades: {
			rows: 4,
			cols: 4,
			11: {
				title: "Begin",
				description: "Generate 2 Point every second.",
				cost() { return tmp.h.costMult11.times(((Array.isArray(tmp.ma.mastered))?tmp.ma.mastered.includes(this.layer):false)?2:1).pow(tmp.h.costExp11) },
                        12: {
				title: "Prestige Boost",
				description: "Prestige Points boost Point generation.",
				cost() { return tmp.h.costMult11.times(((Array.isArray(tmp.ma.mastered))?tmp.ma.mastered.includes(this.layer):false)?10:1).pow(tmp.h.costExp11) },
				effect() {
					if (inChallenge("ne", 11)) return new Decimal(1);
					
					let eff = player.p.points.plus(8).pow(1.9);
					if (hasUpgrade("g", 14)) eff = eff.pow(1.9);
					if (hasUpgrade("g", 24)) eff = eff.pow(1.866667);
					if (hasUpgrade("g", 34) && player.i.buyables[12].gte(2)) eff = eff.pow(1.8333)
					
					if (hasChallenge("h", 22)) eff = softcap("p12_h22", eff);
					else eff = softcap("p12", eff);
					
					if (hasUpgrade("PA", 14)) eff = eff.pow(3);
					if (hasUpgrade("hn", 14)) eff = eff.pow(1.05);
					if (hasUpgrade("b", 34) && player.i.buyables[12].gte(1)) eff = eff.pow(upgradeEffect("b", 34));
					if ((Array.isArray(tmp.ma.mastered))?tmp.ma.mastered.includes(this.layer):false) eff = eff.pow(1.1);
					
					return eff;
				},
				unlocked() { return hasUpgrade("PA", 11) },
				effectDisplay() { return format(tmp.p.upgrades[12].effect)+"x" },
				formula() { 
					if (inChallenge("ne", 11)) return "DISABLED";
				
					let exp = new Decimal(1*(hasUpgrade("g", 14)?1.5:1)*(hasUpgrade("g", 24)?1.4666667:1));
					if (hasUpgrade("g", 34) && player.i.buyables[12].gte(2)) exp = exp.times(1.4333333);
					if (hasUpgrade("b", 34) && player.i.buyables[12].gte(1)) exp = exp.times(upgradeEffect("b", 34));
					if ((Array.isArray(tmp.ma.mastered))?tmp.ma.mastered.includes(this.layer):false) exp = exp.times(1.1);
					let f = "(x+2)^"+format(exp)
					if (upgradeEffect("p", 12).gte("1e3500")) {
						if (hasChallenge("h", 22)) f = "10^(sqrt(log(x+2))*"+format(Decimal.mul(exp, 3500).sqrt())+")"
						else f = "log(x+2)*"+format(Decimal.div("1e3500",3500).times(exp))
					}
					if (hasUpgrade("PA", 14)) f += "^"+(hasUpgrade("hn", 14)?3.15:3)
					return f;
				},
			
