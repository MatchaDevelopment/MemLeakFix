// all this code was translated from https://github.com/inglettronald/DulkirMod/blob/master/src/main/kotlin/dulkirmod/features/MemoryLeakFix.kt

const d = new Date();
let ms = d.getMilliseconds();

let lastClear = Date.now()

function isNullVec(e) { // "e" must be a minecraft entity, NOT a chattriggers entity
    return e.field_70165_t == 0 && e.field_70163_u == 0 && e.field_70161_v == 0 // posX, posY, posZ
}

function clearBlankStands() {
    const currentEnts = World.getWorld().field_72996_f
    currentEnts.forEach(e => {
        if(e instanceof Java.type("net.minecraft.entity.item.EntityArmorStand")) {
            if(e.func_145818_k_()) return; // hasCustomName
            if(e.field_70173_aa < 1200) return; // ticksExisted
            if(e.field_145783_c == undefined) return; // this sometimes happens and sometimes doesnt idk why but :shrug:
            World.getWorld().func_73028_b(e.field_145783_c) // func_73028_b = removeEntityFromWorld || field_145783_c = entityId
        }
    })
}

register("tick", () => { 
    if(ms - lastClear >= 30000) {
        const ents = World.getAllEntitiesOfType(Java.type("net.minecraft.client.entity.EntityOtherPlayerMP"))
        ents.forEach(e => {
            if(e.field_70128_L) {
                ents.remove(e)
            }
            if(isNullVec(e)) {
                if(e.field_145783_c == undefined) return; // this sometimes happens and sometimes doesnt idk why but :shrug:
                World.getWorld().func_73028_b(e.field_145783_c) // func_73028_b = removeEntityFromWorld || field_145783_c = entityId
            }
        })
        lastClear = Date.now().getMilliseconds()
    }
    clearBlankStands()
})