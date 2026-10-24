# Karim the Warehouse Worker: Primary Persona

> Primary target. His weekly recording is what every other objective depends on.

**Priority:** PRIMARY
**Role in flywheel:** records receipts, picks, damage and counts at source → complete, accurate record → owner trust → product proof
**Created:** 2026-10-23
**Sources:** PRD §2.1 JTBD, UJ-1, UJ-2, UJ-9; EXPERIENCE.md → Foundation. Fears and quotes are `[ASSUMPTION]` until interviews.

## Profile Summary

**Karim works the floor at the Narayanganj warehouse: receiving deliveries,
picking dispatch orders, moving cartons. He's quick with his hands and slow to
trust paperwork, because paperwork has never protected him.** When stock goes
missing today, the worker nearest the gap gets blamed. If Mojud makes recording
faster than skipping it, and makes his record his defence, he records. If it
doesn't, nothing else in the product matters.

## Visual Representation

**Image generation prompt:**
"Candid photograph of a 26-year-old Bangladeshi man in a plain work shirt,
standing in a dim FMCG warehouse aisle between stacked cartons of rice and
cooking oil, holding a low-cost Android phone in one hand and a carton edge in
the other, focused and slightly hurried expression, natural mixed lighting from
a roller door, documentary photography style, shallow depth of field."

## Context of Use

- **Where:** warehouse floor and loading bay, standing, often one-handed
- **Device:** a shared low-end Android phone in Chrome, with a cracked screen possible; low battery common
- **Connectivity:** patchy; drops at the back of the warehouse
- **Language:** reads Bangla comfortably and some English; product names stay as printed
- **Moments:** receiving a supplier truck (blind count), picking a dispatch order, finding a crushed carton, counting an aisle, receiving a transfer

## Goals (usage context)

- Finish the current task and see the next one without asking anyone
- Record a line in one scan and one tap
- Know for certain that what he recorded was saved
- Have something to point to when a gap is questioned ("My record")

## Driving Forces

**Positive (wants):**
- ✅ Speed: get the truck unloaded, the order picked
- ✅ Proof: a visible trail of what he counted and flagged
- ✅ Clarity: one obvious next action on every screen
- ✅ Respect: a tool that treats him as trustworthy

**Negative (fears):**
- ❌ Being blamed for a shortfall someone else caused
- ❌ Extra steps, typing or forms when his hands are full
- ❌ Losing counts when the network drops mid-delivery
- ❌ Recording under someone else's name on a shared phone
- ❌ Looking foolish on a confusing or English-only screen

## Illustrative Quote

> "If it shows I counted 92, then 92 is what came. Don't put the 8 on me."
> *(illustrative, not from an interview)*

## Design Implications

- Floor screens at 360px, big quantity numbers, fixed bottom Scan bar (DESIGN.md)
- Defaults pre-filled; ≤ 1 scan + 1 tap per routine line (NFR-2)
- Instant "Saved" / "Saved on phone, will sync" feedback, then the next task (FR-52, FR-53)
- Blind screens never show expected quantities (FR-21, FR-27, FR-35)
- Signed-in name always visible in the app bar on floor screens (shared phones)
- Never use blame words in copy (EXPERIENCE.md → Voice and Tone)
- "My record" shows his completed work as proof (FR-51)
