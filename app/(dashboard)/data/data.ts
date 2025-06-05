export const NOTES = [
  {
    id: "1",
    title: "Quick Tips",
    content: "1. Create new notes with the `Create New Note` button\n2. Add tags to organize your notes\n3. Archive notes you don't need right now\n4. Use the editor toolbar for formatting\n5. Save notes",
    tags: ["tips", "help"],
    userId: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isArchived: false,
    isFavorite: false,
    isTrashed: false,
  },
  {
    id: "2",
    title: "Welcome to Quikmemo!",
    content: "This is your first note. Feel free to edit or delete it.\n\nSome features you can try:\n- Edit this note\n- Add tags\n- Archive it\n- Create new notes\n- Delete notes\n\nThank you for choosing Quikmemo!",
    tags: ["welcome", "getting-started"],
    userId: "",
    createdAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
    isArchived: false,
    isFavorite: false,
    isTrashed: false,
  }
]