const Event = require('../models/event');

// register attendee for event
exports.registerForEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  const alreadyRegistered = event.attendees.find(
    (a) => a.attendeeId.toString() === req.user.id
  );

  if (alreadyRegistered)
    return res.status(400).json({ message: 'Already registered' });

  event.attendees.push({ attendeeId: req.user.id });
  await event.save();

  res.json({ message: 'Registered successfully' });
};

// add feedback
exports.submitFeedback = async (req, res) => {
  const { rating, comment } = req.body;
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  const alreadySubmitted = event.feedback.find(
    (f) => f.attendeeId.toString() === req.user.id
  );

  if (alreadySubmitted)
    return res.status(400).json({ message: 'Feedback already submitted' });

  event.feedback.push({ attendeeId: req.user.id, rating, comment });
  await event.save();

  res.json({ message: 'Feedback submitted' });
};
