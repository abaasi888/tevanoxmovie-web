import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { useAuth } from '../hooks/useAuth';

const Subscription = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { plans, status, loading, fetchPlans, fetchStatus, activateSubscription } = useSubscriptions();
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    fetchPlans();
    fetchStatus();
  }, []);

  const handleSubscribe = async () => {
    if (!selectedPlan) return;
    navigate('/payment', { state: { plan: selectedPlan } });
  };

  const features = [
    'Unlimited Movies & Series',
    'Unlimited Music',
    'Download for Offline Viewing',
    'Ad-free Experience',
    'Exclusive Content',
    'Cancel Anytime',
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress sx={{ color: '#FF4757' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', mb: 2 }}>
        Choose Your Plan
      </Typography>
      <Typography variant="body1" sx={{ color: '#888', textAlign: 'center', mb: 4 }}>
        Get unlimited access to all content with a subscription
      </Typography>

      {/* Current Status */}
      {status && (
        <Paper sx={{ bgcolor: '#1a1a2e', p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Current Subscription
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {status.is_active ? (
              <>
                <Chip
                  icon={<CheckCircle />}
                  label="Active"
                  color="success"
                  size="small"
                />
                <Typography variant="body2" sx={{ color: '#888' }}>
                  {status.plan} plan • {status.days_remaining} days remaining
                </Typography>
              </>
            ) : (
              <>
                <Chip
                  icon={<Cancel />}
                  label="Inactive"
                  color="error"
                  size="small"
                />
                <Typography variant="body2" sx={{ color: '#888' }}>
                  No active subscription
                </Typography>
              </>
            )}
          </Box>
        </Paper>
      )}

      {/* Plans */}
      <Grid container spacing={3} justifyContent="center">
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card
              sx={{
                bgcolor: '#1a1a2e',
                borderRadius: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: selectedPlan?.id === plan.id ? '2px solid #FF4757' : 'none',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              {plan.popular && (
                <Chip
                  label="Popular"
                  color="primary"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: -12,
                    right: 16,
                    bgcolor: '#FF4757',
                  }}
                />
              )}
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {plan.name}
                </Typography>
                <Typography variant="h4" sx={{ color: '#FF4757', fontWeight: 700, mb: 1 }}>
                  UGX {plan.price.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ color: '#888', mb: 2 }}>
                  per {plan.duration} days
                </Typography>
                <Divider sx={{ borderColor: '#2a2a3e', mb: 2 }} />
                <List dense>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircle sx={{ color: '#4CAF50', fontSize: 16 }} />
                      </ListItemIcon>
                      <ListItemText                        primary={feature}
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { color: '#aaa' },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions sx={{ p: 2 }}>
                <Button
                  fullWidth
                  variant={selectedPlan?.id === plan.id ? 'contained' : 'outlined'}
                  onClick={() => setSelectedPlan(plan)}
                  sx={{
                    ...(selectedPlan?.id === plan.id && {
                      bgcolor: '#FF4757',
                      '&:hover': { bgcolor: '#CC1A2C' },
                    }),
                    ...(selectedPlan?.id !== plan.id && {
                      color: '#FF4757',
                      borderColor: '#FF4757',
                    }),
                  }}
                >
                  {selectedPlan?.id === plan.id ? 'Selected' : 'Select'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Subscribe Button */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          disabled={!selectedPlan}
          onClick={handleSubscribe}
          sx={{
            bgcolor: '#FF4757',
            px: 6,
            py: 1.5,
            '&:hover': { bgcolor: '#CC1A2C' },
            '&.Mui-disabled': { bgcolor: '#666' },
          }}
        >
          Subscribe Now
        </Button>
        {!selectedPlan && (
          <Typography variant="caption" sx={{ color: '#888', display: 'block', mt: 1 }}>
            Please select a plan to continue
          </Typography>
        )}
      </Box>

      {/* Features */}
      <Paper sx={{ bgcolor: '#1a1a2e', p: 3, mt: 4, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          What's Included
        </Typography>
        <Grid container spacing={2}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle sx={{ color: '#4CAF50', fontSize: 16 }} />
                <Typography variant="body2" sx={{ color: '#aaa' }}>
                  {feature}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* FAQ */}
      <Paper sx={{ bgcolor: '#1a1a2e', p: 3, mt: 2, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Frequently Asked Questions
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 600 }}>
            Can I cancel anytime?
          </Typography>
          <Typography variant="body2" sx={{ color: '#888' }}>
            Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 600 }}>
            What payment methods do you accept?
          </Typography>
          <Typography variant="body2" sx={{ color: '#888' }}>
            We accept Mobile Money (MTN, Airtel, Africell) and Visa/Mastercard credit cards.
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 600 }}>
            Can I download content?
          </Typography>
          <Typography variant="body2" sx={{ color: '#888' }}>
            Yes, with any subscription plan you can download content for offline viewing.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Subscription;