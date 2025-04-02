# Issue: Zombies Not Spawning  

## Problem  
- Clients cannot spawn zombies with `boss.TriggerId: "InfectedSpawn{0}"`.  
- There is a client-side check using `bots.core.ACTIVE_HALLOWEEN_ZOMBIES_EVENT` when attempting to spawn zombies.  
- However, SPT does not handle `bots.core.ACTIVE_HALLOWEEN_ZOMBIES_EVENT`.  

## Relevant Code  
The flag check occurs in `BotsEventsController.SpawnAction`:  

```csharp
public void SpawnAction()
{
    if (GClass598.Core.ACTIVE_HALLOWEEN_ZOMBIES_EVENT)
    {
        BotHalloweenWithZombies?.SpawnAction();
    }
}