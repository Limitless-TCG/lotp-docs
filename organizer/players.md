# Participants List

You can use the *Edit participants* page of a tournament to view and edit players that registered for the tournament.

In addition to the publicly available information like the players' display name and country, this list also includes their ingame names, any custom registration fields, as well as their Discord tag (if they added it to their profile).

You can always edit the display name of any player in the tournament, as well as their ingame name. Players themselves can only edit their registration information while registration is still open, so in case any mistakes come up during the tournament, an admin would need to fix them here.

You can use this page to remove players from the tournament. If you do this before it starts, they will be removed completely, while if you do it during the tournament, they will be dropped.

It is also possible to "undrop" players that were dropped, or dropped themselves. However, this is only possible during the round the drop happened. Once a new round is started, they become final!

If the tournament uses a Custom format, this page allows you to see players’ decklists prior to tournament start, so you can manually check them if needed (since the *Custom* format does not have an automatic deck check).

## Bracket Seeding
If your tournament's first phase is a bracket (single/double-elimination bracket, or single-elimination rounds), you can manually seed the bracket to control where players appear in it. For example, if you have 8 players and assign them seeds 1–8, the top 8 matches will be seed 1 vs 8, 2 vs 7, etc, with the bracket being set up so that 1 plays vs 2 in the finals if both win all their matches.

**If you do not manually assign seeds, players will be paired into the bracket randomly**, so this setting is fully optional. If some players have an assigned seed, while others don't, those without a seed will be randomly seeded below those with a manually assigned one (whenever a seed is missing, players with a manually assigned seed move up to fill it).

You can assign seeds by selecting a player from the list and updating it just as you would with the player's other information. You can also edit them in bulk by uploading a csv file with the columns *username* and *seed*. The form at the bottom of the page gives you the option to download a file with the current seeding, edit it as you wish, and then upload it again to update all listed players at once.

If you do not see the option to edit seeding, make sure the tournament is set up as a bracket in the *Phases* section of the *Edit tournament* page.

## Static Seating
At in-person tournaments, you might want to assign a fixed table number to a specific player. To do so, select the player from the list, check *Assign static table* under *Additional options*, and enter a table number. The player's regular table number will then be replaced in pairings every round. However, the regular table numbering flow will not be impacted, so make sure that the selected table does not appear in the tournament naturally (otherwise it might appear twice)! To do so, you can use special table numbers like "S1", or move regular numbering back (in the phase settings) and use the first tables for static seating.  