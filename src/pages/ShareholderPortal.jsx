import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Snackbar,
} from '@mui/material';
import {
  AccountBalanceWallet,
  TrendingUp,
  AttachMoney,
  People,
  History,
  Payments,
  Receipt,
  Refresh,
  Download,
  Visibility,
  AddCircle,
  Repeat,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useShareholder } from '../hooks/useShareholder';
import Loading from '../components/common/Loading';

const ShareholderPortal = () => {
  const { user } = useAuth();
  const { 
    shareholderInfo, 
    dividends, 
    loading, 
    error,
    fetchShareholderData,
    purchaseShares,
    reinvestDividend,
  } = useShareholder();

  const [tabValue, setTabValue] = useState(0);
  const [openPurchaseDialog, setOpenPurchaseDialog] = useState(false);
  const [shareAmount, setShareAmount] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (user) {
      fetchShareholderData();
    }
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePurchase = async () => {
    if (shareAmount < 1) {
      showSnackbar('Please enter a valid number of shares', 'error');
      return;
    }
    
    const result = await purchaseShares(shareAmount, paymentMethod);
    if (result.success) {
      showSnackbar('Shares purchased successfully! 🎉', 'success');
      setOpenPurchaseDialog(false);
      setShareAmount(1);
      fetchShareholderData();
    } else {
      showSnackbar(result.error || 'Failed to purchase shares', 'error');
    }
  };

  const handleReinvest = async (dividendId) => {
    const result = await reinvestDividend(dividendId);
    if (result.success) {
      showSnackbar('Dividend reinvested successfully! 📈', 'success');
      fetchShareholderData();
    } else {
      showSnackbar(result.error || 'Failed to reinvest dividend', 'error');
    }
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const formatCurrency = (amount) => {
    return `UGX ${amount?.toLocaleString() || 0}`;
  };

  if (loading) {
    return <Loading message="Loading your shareholder data..." />;
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          startIcon={<Refresh />}
          onClick={fetchShareholderData}
        >
          Retry
        </Button>
      </Container>
    );
  }

  if (!shareholderInfo) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: '#fff', mb: 2 }}>
          💰 Become a Shareholder
        </Typography>
        <Typography variant="body1" sx={{ color: '#aaa', mb: 4 }}>
          Invest in TevanoxMovie and earn dividends from company profits.
          Each share costs UGX 15,000.
        </Typography>
        <Paper sx={{ p: 4, bgcolor: '#1a1a2e', maxWidth: 400, mx: 'auto', mb: 4 }}>
          <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
            Why Invest?
          </Typography>
          <Box textAlign="left" sx={{ color: '#aaa' }}>
            <Typography>• 📈 Earn annual dividends</Typography>
            <Typography>• 🏢 Own a piece of TevanoxMovie</Typography>
            <Typography>• 🗳️ Voting rights on company decisions</Typography>
            <Typography>• 📊 Quarterly shareholder reports</Typography>
          </Box>
        </Paper>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddCircle />}
          onClick={() => setOpenPurchaseDialog(true)}
          sx={{ bgcolor: '#FF4757' }}
        >
          Invest Now
        </Button>
      </Container>
    );
  }

  const { shareholder, dividends: dividendData, summary } = shareholderInfo;

  const stats = [
    {
      title: 'Total Shares',
      value: shareholder.total_shares || 0,
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#4CAF50',
    },
    {
      title: 'Share Value',
      value: formatCurrency(shareholder.share_price || 0),
      icon: <AccountBalanceWallet sx={{ fontSize: 40 }} />,
      color: '#2196F3',
    },
    {
      title: 'Portfolio Value',
      value: formatCurrency(shareholder.portfolio_value || 0),
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#FF9800',
    },
    {
      title: 'Total Dividends',
      value: formatCurrency(summary?.total_profit_share || 0),
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      color: '#9C27B0',
    },
  ];

  const upcomingDividends = dividendData?.upcoming || [];
  const dividendHistory = dividendData?.history || [];

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'reinvested': return 'info';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
            💰 Shareholder Portal
          </Typography>
          <Typography variant="body1" sx={{ color: '#aaa' }}>
            Welcome, {shareholder.full_name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip
            label={`${shareholder.tier?.toUpperCase() || 'Bronze'}`}
            color={shareholder.tier === 'platinum' ? 'success' : shareholder.tier === 'gold' ? 'warning' : 'default'}
            size="medium"
            sx={{ fontWeight: 600 }}
          />
          <Button
            variant="contained"
            startIcon={<AddCircle />}
            onClick={() => setOpenPurchaseDialog(true)}
            sx={{ bgcolor: '#FF4757' }}
          >
            Buy Shares
          </Button>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={fetchShareholderData}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {/* ROI Card */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: '#1a1a2e', borderLeft: '4px solid #FF4757' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="body2" color="textSecondary">
              Return on Investment (ROI)
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              {shareholder.roi?.toFixed(2) || 0}%
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Box>
              <Typography variant="caption" color="textSecondary">Unrealized Gain</Typography>
              <Typography sx={{ color: '#4CAF50' }}>
                {formatCurrency(summary?.unrealized_gain || 0)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="textSecondary">Realized Gain</Typography>
              <Typography sx={{ color: '#FF9800' }}>
                {formatCurrency(summary?.realized_gain || 0)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2, border: `1px solid ${stat.color}33` }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#fff', mt: 1 }}>
                    {stat.value}
                  </Typography>
                </Box>
                <Box sx={{ color: stat.color }}>
                  {stat.icon}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <Paper sx={{ bgcolor: '#1a1a2e', borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': { color: '#aaa' },
            '& .Mui-selected': { color: '#FF4757' },
          }}
        >
          <Tab label="📊 Overview" />
          <Tab label="📈 Dividend History" />
          <Tab label="⏳ Upcoming Dividends" />
        </Tabs>

        {/* Tab Panels */}
        <Box sx={{ p: 3 }}>
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                  Share Summary
                </Typography>
                <Box sx={{ color: '#aaa' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography>Total Investment</Typography>
                    <Typography sx={{ color: '#fff' }}>{formatCurrency(shareholder.total_investment || 0)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography>Current Portfolio Value</Typography>
                    <Typography sx={{ color: '#4CAF50' }}>{formatCurrency(shareholder.portfolio_value || 0)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography>Total Dividends Earned</Typography>
                    <Typography sx={{ color: '#FF9800' }}>{formatCurrency(shareholder.total_dividends_earned || 0)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography>Shareholder Since</Typography>
                    <Typography sx={{ color: '#fff' }}>
                      {new Date(shareholder.joined_date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<AddCircle />}
                    onClick={() => setOpenPurchaseDialog(true)}
                    sx={{ bgcolor: '#FF4757' }}
                    fullWidth
                  >
                    Purchase More Shares
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Payments />}
                    disabled
                    fullWidth
                  >
                    Request Dividend Payout (Coming Soon)
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}

          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                Dividend History
              </Typography>
              {dividendHistory.length === 0 ? (
                <Typography sx={{ color: '#aaa' }}>No dividend history yet.</Typography>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: '#aaa' }}>Date</TableCell>
                        <TableCell sx={{ color: '#aaa' }}>Amount</TableCell>
                        <TableCell sx={{ color: '#aaa' }}>Per Share</TableCell>
                        <TableCell sx={{ color: '#aaa' }}>Shares Held</TableCell>
                        <TableCell sx={{ color: '#aaa' }}>Status</TableCell>
                        <TableCell sx={{ color: '#aaa' }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dividendHistory.map((div) => (
                        <TableRow key={div.id}>
                          <TableCell sx={{ color: '#fff' }}>
                            {new Date(div.payment_date).toLocaleDateString()}
                          </TableCell>
                          <TableCell sx={{ color: '#4CAF50' }}>
                            {formatCurrency(div.amount)}
                          </TableCell>
                          <TableCell sx={{ color: '#fff' }}>
                            {formatCurrency(div.dividend_per_share)}
                          </TableCell>
                          <TableCell sx={{ color: '#fff' }}>
                            {div.shares_held || '-'}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={div.status}
                              color={getStatusColor(div.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            {div.status === 'paid' && !div.reinvested && (
                              <Tooltip title="Reinvest this dividend">
                                <IconButton
                                  size="small"
                                  onClick={() => handleReinvest(div.id)}
                                  sx={{ color: '#FF9800' }}
                                >
                                  <Repeat />
                                </IconButton>
                              </Tooltip>
                            )}
                            {div.reinvested && (
                              <Chip label="Reinvested" size="small" color="info" />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          )}

          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                Upcoming Dividends
              </Typography>
              {upcomingDividends.length === 0 ? (
                <Typography sx={{ color: '#aaa' }}>No upcoming dividends.</Typography>
              ) : (
                <Grid container spacing={2}>
                  {upcomingDividends.map((div) => (
                    <Grid item xs={12} md={6} key={div.id}>
                      <Paper sx={{ p: 3, bgcolor: '#0e0e2a' }}>
                        <Typography sx={{ color: '#FF4757', fontWeight: 600 }}>
                          {formatCurrency(div.amount)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#aaa' }}>
                          Declared: {new Date(div.declaration_date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#aaa' }}>
                          Payment: {new Date(div.payment_date).toLocaleDateString()}
                        </Typography>
                        <Chip
                          label="Pending"
                          color="warning"
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}
        </Box>
      </Paper>

      {/* Purchase Dialog */}
      <Dialog 
        open={openPurchaseDialog} 
        onClose={() => setOpenPurchaseDialog(false)}
        PaperProps={{ sx: { bgcolor: '#1a1a2e', color: '#fff', p: 2 } }}
      >
        <DialogTitle>Purchase Shares</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: '#aaa', mb: 2 }}>
            Each share costs UGX 15,000. Minimum purchase: 1 share.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Number of Shares"
            type="number"
            fullWidth
            value={shareAmount}
            onChange={(e) => setShareAmount(Math.max(1, parseInt(e.target.value) || 1))}
            inputProps={{ min: 1 }}
            sx={{ mb: 2 }}
            InputLabelProps={{ sx: { color: '#aaa' } }}
            InputProps={{ sx: { color: '#fff' } }}
          />
          <Typography variant="body1" sx={{ color: '#4CAF50', mb: 2 }}>
            Total: UGX {(shareAmount * 15000).toLocaleString()}
          </Typography>
          <TextField
            select
            label="Payment Method"
            fullWidth
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            SelectProps={{
              native: true,
            }}
            InputLabelProps={{ sx: { color: '#aaa' } }}
            InputProps={{ sx: { color: '#fff' } }}
          >
            <option value="bank_transfer">Bank Transfer</option>
            <option value="mobile_money">Mobile Money</option>
            <option value="cheque">Cheque</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPurchaseDialog(false)} sx={{ color: '#aaa' }}>
            Cancel
          </Button>
          <Button 
            onClick={handlePurchase} 
            variant="contained"
            sx={{ bgcolor: '#FF4757' }}
          >
            Purchase
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ShareholderPortal;
